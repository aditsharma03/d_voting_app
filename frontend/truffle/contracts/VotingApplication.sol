// SPDX-License-Identifier: MIT
pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;



import "./Poll.sol";




contract VotingApplication {



    uint256 public pollCount;
    mapping( uint256 => address ) public polls;



    event PollCreated(uint256 pollId, address pollAddress);






    // Set the contract deployer as the owner.
    constructor() public {
        pollCount = 0;
    }



    function createPoll( Poll.PollStruct memory _poll ) public {
        pollCount++;
        Poll _newPoll = new Poll( msg.sender,  _poll );
        //Poll _newPoll = new Poll();

        polls[pollCount] = address(_newPoll);
        emit PollCreated(pollCount, address(_newPoll));
    }








}

