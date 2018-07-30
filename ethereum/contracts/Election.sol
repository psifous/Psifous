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
        address voter,
        uint votersCount
    );
    
    address public admin;
    Candidate[] public candidates;
    mapping(address => bool) public voters;
    mapping(address => bool) public votings;
    uint public votersCount;
    
    modifier restricted {
        require(msg.sender == admin);
        _;
    }
    
    constructor (address creator) public {
        admin = creator;
    }
    
    function addVoter(address voterAddress) public restricted {
        voters[voterAddress] = true;
        votersCount++;
        emit VoterLog(voterAddress, votersCount);
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
    
    function submitVote(uint candidateIndex) public {
        require(voters[msg.sender]);
        require(!votings[msg.sender]);
        
        Candidate storage candidate = candidates[candidateIndex];
        
        votings[msg.sender] = true;
        candidate.voteCount++;
    }
    
    function getCandidatesCount() public view returns (uint) {
        return candidates.length;
    }
}