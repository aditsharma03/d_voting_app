// SPDX-License-Identifier: MIT
pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;



contract Poll {


    struct Candidate {
        uint256 id;
        //string uid;
        string name;
        string description;

        uint256 voteCount;
    }

    address owner;


    //config
    bool realTimeTally;

    uint256 candidateCount;
    mapping(uint256 => Candidate) candidates;


    mapping( address => bool ) voterEligibility;
    mapping(address => bool) hasVoted;



    // Event that is emitted when a vote is successfully cast.
    event VotedEvent(uint256 indexed candidateId);




    // Set the contract deployer as the owner.
    constructor( bool _realTimeTally, string[] memory _candidateNames, string[] memory _candidateDescriptions, 
                address[] memory _voters ) public {

        owner = msg.sender;

        realTimeTally = _realTimeTally;

        candidateCount = _candidateNames.length;
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates[i] = Candidate(i, _candidateNames[i], _candidateDescriptions[i], 0);
        }
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            voterEligibility[ _voters[i] ] = true;
        }
    }
















}

