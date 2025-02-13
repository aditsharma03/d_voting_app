// SPDX-License-Identifier: MIT
pragma solidity 0.5.0;


contract VotingApplication {



    // Set the contract deployer as the owner.
    constructor() public {
        pollCount = 0;
    }



    // Event that is emitted when a vote is successfully cast.
    event VotedEvent(uint256 indexed candidateId);




    struct Candidate {
        uint256 id;
        string uid;
        string name;
        uint256 voteCount;
    }
    


    struct Poll {

        uint256 id;
        string uid;
        address owner;

        bool realTimeTallying;


        mapping( address => bool ) isEligibleVoter;


        uint256 candidatesCount;
        mapping(uint256 => Candidate) candidates;

        // Mapping to record whether an address has already voted.
        mapping(address => bool) hasVoted;

    }




    uint256 public pollCount;
    mapping( uint256 => Poll ) public polls;


//    function addPoll( Poll memory _poll ) public {
 //       pollCount++;
  //      polls[pollCount] = _poll;
   // }







}

