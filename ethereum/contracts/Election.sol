pragma solidity ^0.4.24;

contract ElectionFactory {
    address[] public deployedElections;

    event ElectionLog (
        address election
    );
    
    function createElection() public {
        address newElection = new Election(msg.sender);
        uint electionId = deployedElections.push(newElection)-1;
        emit ElectionLog(deployedElections[electionId]);
    }

    function getDeployedElections() public view returns (address[]) {
        return deployedElections;
    }
}

contract Election {
    
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    event CandidateLog(
        uint id,
        string name,
        uint voteCount,
        uint index
    );

    event VoterLog (
        uint voterId,
        uint votersCount
    );

    event VoteLog (
        uint voter
    );
    
    address public admin;
    Candidate[] public candidates;
    mapping(uint => bool) public voters;
    mapping(uint => bool) public votings;
    uint public votersCount;
    
    modifier restricted {
        require(msg.sender == admin);
        _;
    }
    
    constructor (address creator) public {
        admin = creator;
    }
    
    function addVoter(uint voterId) public restricted {
        voters[voterId] = true;
        votersCount++;
        emit VoterLog(voterId, votersCount);
    }
    
    function addCandidate(uint id, string name) public restricted {
        Candidate memory newCandidate = Candidate({
            id: id,
            name: name,
            voteCount: 0
        });
        
        candidates.push(newCandidate);
        emit CandidateLog(newCandidate.id, newCandidate.name, newCandidate.voteCount, candidates.length-1);
    }
    
    function submitVote(uint candidateIndex, uint voterId) public {
        require(voters[voterId]);
        require(!votings[voterId]);
        
        Candidate storage candidate = candidates[candidateIndex];
        
        votings[voterId] = true;
        candidate.voteCount++;
        emit VoteLog(voterId);
    }
    
    function getCandidatesCount() public view returns (uint) {
        return candidates.length;
    }
}