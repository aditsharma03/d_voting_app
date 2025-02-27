// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;



contract Poll {


    // Describes a candidate
    struct Candidate {
        string id;
        string name;
        string description;
    }

    // Descirbes The configuration required by the constructor to instantiate a new Poll contract
    struct PollStruct {
        string id;

        bool realTimeTally;

        bool isStartAutomated;
        bool isEndAutomated;

        uint256 startTime;
        uint256 endTime;

        Candidate[] candidates;
        address[] eligibleVoters;
    }

    struct VoteStruct {
        string candidate_id;
        uint256 voteCount;
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
    modifier pollActive( uint256 time ) {
        require( time >= startTime, "This poll has not started yet" );
        require( time <= endTime, "This poll has already ended" );
        _;
    }
    modifier checkRealtime( uint256 time ){
        if (!realTimeTally) {
            require( time > endTime, "Real time tally is currently not available" );
        } 
        _;
    }




    address public owner;


    // config starts here ######################################################################
    string public id;

    bool public realTimeTally;

    //bool public isStartAutomated;
    uint256 public startTime;

    //bool public isEndAutomated;
    uint256 public endTime;

    // config engs here #######################################################################


    uint256 public candidateCount;
    mapping(string => uint256 ) public candidate_id_to_index;
    mapping(uint256 => Candidate) public candidates;


    mapping( address => bool ) voterEligibility;
    mapping(address => bool) hasVoted;

    
    mapping( uint256 => uint256 ) votes;



    // Event that is emitted when a vote is successfully cast.
    event VotedEvent(string candidateId);
    event PollCreated( bool realTimeTally, uint256 startTime, uint256 endTime );




    // Set the contract deployer as the owner.
    constructor( address _owner, PollStruct memory _poll ) {

        owner = _owner;

        id = _poll.id;

        realTimeTally = _poll.realTimeTally;


        startTime = 0;
        endTime = 2**256 -1;

        if( _poll.isStartAutomated ){
            startTime = _poll.startTime;
        }
        if( _poll.isEndAutomated ){
            endTime = _poll.endTime;
        }



        candidateCount = 0;
        for (uint256 i = 0; i < _poll.candidates.length; i++) {
            candidate_id_to_index[ _poll.candidates[i].id ] = candidateCount;
            candidates[ candidateCount ] = Candidate( _poll.candidates[i].id, _poll.candidates[i].name, _poll.candidates[i].description );
            votes[ candidateCount ] = 0;
            candidateCount++;
        }
        for (uint256 i = 0; i < _poll.eligibleVoters.length; i++) {
            voterEligibility[ _poll.eligibleVoters[i] ] = true;
        }

        emit PollCreated( realTimeTally, startTime, endTime );
    }





    function getResult( uint256 time ) public view checkRealtime(time) returns (VoteStruct[] memory) {

        VoteStruct[] memory temp = new VoteStruct[](candidateCount);

        for (uint256 i = 0; i < candidateCount; i++) {
            temp[i] =  VoteStruct( candidates[i].id, votes[i] );
        }

        return temp;
    }



    
    function voteCandidate( string memory candidate_id, uint256 time ) public pollActive(time) onlyEligible {

        uint256  temp_id = candidate_id_to_index[candidate_id];

        uint256 temp_vote = votes[ temp_id ];

        temp_vote++;
        hasVoted[ msg.sender ] = true;

        votes[ temp_id ] = temp_vote;


        emit VotedEvent(candidate_id);
    }











}

