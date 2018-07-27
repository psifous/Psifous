pragma solidity ^0.4.24;

contract ElectionFactory {
    address[] public deployedElections;
    
    function createElection() public {
        address newElection = new Election(msg.sender);
        deployedElections.push(newElection);
    }

    function getDeployedElections() public view returns (address[]) {
        return deployedElections;
    }
}

contract Election {
    
    struct Candidate {
        string name;
        uint voteCount;
    }
    
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
    }
    
    function addCandidate(string name) public restricted {
        Candidate memory newCandidate = Candidate({
            name: name,
            voteCount: 0
        });
        
        candidates.push(newCandidate);
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