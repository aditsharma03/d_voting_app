// SPDX-License-Identifier: MIT
pragma solidity 0.5.0;


contract Voting {

    address public owner;

    mapping( address => bool ) public isEligibleVoter;



    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }
    modifier onlyEligibleVoter() {
        require( isEligibleVoter[msg.sender] , "Only people who are authorised to vote can access this action" );
        _;
    }





    uint256 public candidatesCount;

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
    
    mapping(uint256 => Candidate) public candidates;
    



    // Mapping to record whether an address has already voted.
    mapping(address => bool) public hasVoted;
    
    









    // Event that is emitted when a vote is successfully cast.
    event VotedEvent(uint256 indexed candidateId);












    
    
    // Set the contract deployer as the owner.
    constructor() public {
        owner = msg.sender;
        addVoter(owner);
        addCandidate("aniket negi");
    }





    
    /// @notice Adds a new candidate to the ballot.
    function addCandidate(string memory _name) public onlyOwner {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function addVoter( address _addressString  ) public onlyOwner {
        isEligibleVoter[_addressString] = true;
    }


















    
    /// @notice Allows an address to vote for a candidate.
    function voteCandidate(uint256 _candidateId) public onlyEligibleVoter  {

        require(!hasVoted[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Candidate does not exist.");
        
        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        
        // Emit an event to log the vote.
        emit VotedEvent(_candidateId);
    }






}

