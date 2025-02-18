const {ethers} = require("hardhat");
const {expect} = require("chai");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");





const deployContractFixture = async () => {

    const accounts = await ethers.getSigners();

    const candidateobj1 = {
        id: 1,
        name: "aniketneg",
        description: "bublu",
        voteCount: 0
    };
    const candidateobj2 = {
        id: 2,
        name: "kothiyal",
        description: "abhishek",
        voteCount: 0
    };

    const candidates = [candidateobj1, candidateobj2];
    const voters = accounts.slice(0,5);

    const pollobj1 = {
        id: "uuid1",
        realTimeTally: true,
        candidates: candidates,
        eligibleVoters: voters
    }
    const pollobj2 = {
        id: "uuid2",
        realTimeTally: true,
        candidates: candidates,
        eligibleVoters: voters
    }

    const voting = await ethers.deployContract("VotingApplication");
    await voting.waitForDeployment();

    return { accounts, candidateobj1, candidateobj2, pollobj1, pollobj2, voting };
}





describe( "VotingApplication Contract", () => {





    it("Should create a poll", async () => {
        const { voting, pollobj1 } = await loadFixture(deployContractFixture);
        let poll = await voting.createPoll(pollobj1);
        expect( poll  ).to.not.undefined;
    });





    
    it("Should add created poll to the mapping", async () => {

        const { voting, pollobj1 } = await loadFixture(deployContractFixture);

        await voting.createPoll(pollobj1);

        
        const pollCount = Number( await voting.pollCount() );
        expect( pollCount ).to.equal( 1 );

        const pollAddress = await voting.polls( pollobj1.id );


        const poll = await ethers.getContractAt( "Poll", pollAddress );


        expect( await poll.id() ).to.equals( pollobj1.id );

    });



    

    it( "Should set the Poll owner correctly", async () => {

        const { accounts, voting, pollobj1, pollobj2 } = await loadFixture(deployContractFixture);

        await voting.connect(accounts[1]).createPoll(pollobj1);
        await voting.connect(accounts[2]).createPoll(pollobj2);


        const pollAddress1 = await voting.polls( pollobj1.id );
        const pollAddress2 = await voting.polls( pollobj2.id );


        const poll1 = await ethers.getContractAt( "Poll", pollAddress1 );
        const poll2 = await ethers.getContractAt( "Poll", pollAddress2 );


        const owner1 = await poll1.owner();
        const owner2 = await poll2.owner();


        expect( owner1 ).to.equals( accounts[1] );
        expect( owner2 ).to.equals( accounts[2] );

    } )







    it( "Should allow voting", async () => {

        const { voting, candidateobj1, candidateobj2, pollobj1, accounts } = await loadFixture(deployContractFixture);
        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );

        const poll = await ethers.getContractAt( "Poll", pollAddress );


        await poll.connect(accounts[1]).voteCandidate( candidateobj1.id );
        await poll.connect(accounts[2]).voteCandidate( candidateobj1.id );
        await poll.connect(accounts[3]).voteCandidate( candidateobj2.id );


        const voteCount1 = Number( ( await poll.candidates(candidateobj1.id) ).voteCount );
        const voteCount2 = Number( ( await poll.candidates(candidateobj2.id) ).voteCount ); 

        expect( voteCount1 ).to.equals( 2 );
        expect( voteCount2 ).to.equals( 1 );


    } )







    it( "Should prohibit uneligible voters to vote", async () => {

        const { voting, candidateobj1, pollobj1, accounts } = await loadFixture(deployContractFixture);
        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );

        const poll = await ethers.getContractAt( "Poll", pollAddress );

        let flag = undefined;

        try {
            const randomaddress = accounts[6];
            await poll.connect(randomaddress).voteCandidate( candidateobj1.id );
            flag = true;
        } 
        catch (error) {
            console.log(error);
            flag = false;
        }


        expect( flag ).to.false;

    } )







    it( "Should not allow voting twice", async () => {

        const { voting, candidateobj1, pollobj1, accounts } = await loadFixture(deployContractFixture);
        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );

        const poll = await ethers.getContractAt( "Poll", pollAddress );

        let flag = undefined;

        try {
            await poll.connect(accounts[1]).voteCandidate( candidateobj1.id );
            await poll.connect(accounts[1]).voteCandidate( candidateobj1.id );
            flag = true;
        } 
        catch (error) {
            console.log(error);
            flag = false;
        }


        expect( flag ).to.false;


    } )


    
    





} )
