// SPDX-License-Identifier: MIT
pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;



contract Poll {


    // Describes a candidate
    struct Candidate {
        uint256 id;
        string name;
        string description;
        uint256 voteCount;
    }

    // Descirbes The configuration required by the constructor to instantiate a new Poll contract
    struct PollStruct {
        bool realTimeTally;
        Candidate[] candidates;
        address[] eligibleVoters;
    }



    modifier onlyOwner {
        require( msg.sender == owner, "Only owner is allowed to access this feature" );
        _;
    }
    modifier onlyEligible {
        require( voterEligibility[msg.sender], "Only eligible voters are allowed to access this feature" );
        require( hasVoted[msg.sender] == false, "You can only use this feature once" );
        _;
    }




    address public owner;


    //config
    bool public realTimeTally;


    uint256 public candidateCount;
    mapping(uint256 => Candidate) public candidates;


    mapping( address => bool ) voterEligibility;
    mapping(address => bool) hasVoted;



    // Event that is emitted when a vote is successfully cast.
    event VotedEvent(uint256 indexed candidateId);




    // Set the contract deployer as the owner.
    constructor( address _owner, PollStruct memory _poll ) public {

        owner = _owner;

        realTimeTally = _poll.realTimeTally;

        candidateCount = _poll.candidates.length;
        for (uint256 i = 0; i < _poll.candidates.length; i++) {
            candidates[i+1] = Candidate( _poll.candidates[i].id, _poll.candidates[i].name, _poll.candidates[i].description, _poll.candidates[i].voteCount );
        }
        for (uint256 i = 0; i < _poll.eligibleVoters.length; i++) {
            voterEligibility[ _poll.eligibleVoters[i] ] = true;
        }
    }





    /*

    // Sample default constructor, will remove
    constructor() public {

        owner = msg.sender;

        realTimeTally = false;

        candidateCount = 1;
            candidates[1] = Candidate(1, "Aniket negi", "this is negi", 0);
            voterEligibility[ owner ] = true;
    }

    */










}

