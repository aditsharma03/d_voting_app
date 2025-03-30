// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;



import "./Poll.sol";




contract VotingApplication {



    uint256 public pollCount;


    mapping( string => address ) public polls;
    mapping( address => string[] ) public pollsByOwners;



    event PollCreated(uint256 pollId, address pollAddress);






    // Set the contract deployer as the owner.
    constructor() {
        pollCount = 0;
    }



    function createPoll( Poll.PollStruct memory _poll ) public {
        pollCount++;
        Poll _newPoll = new Poll( msg.sender,  _poll );
        polls[ _poll.id ] = address(_newPoll);
        pollsByOwners[ msg.sender ].push( _poll.id );

        emit PollCreated(pollCount, address(_newPoll));
    }


    function getYourPolls() public view returns (string[] memory) {
      return pollsByOwners[msg.sender];
    }






}

