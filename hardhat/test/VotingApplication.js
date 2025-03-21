const {ethers} = require("hardhat");
const {expect} = require("chai");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");






const deployContractFixture = async () => {

    const accounts = await ethers.getSigners();

    const candidateobj1 = {
        id: "1",
        name: "aniketneg",
        description: "bublu",
    };
    const candidateobj2 = {
        id: "2",
        name: "kothiyal",
        description: "abhishek",
    };

    const candidates = [candidateobj1, candidateobj2];
    const voters = accounts.slice(0,5);

    const pollobj1 = {
        id: "uuid1",
        realTimeTally: true,
        isStartAutomated: false,
        isEndAutomated: false,
        startTime: 0,
        endTime: 0,
        candidates: candidates,
        eligibleVoters: voters
    }
    const pollobj2 = {
        id: "uuid2",
        realTimeTally: true,
        isStartAutomated: false,
        isEndAutomated: false,
        startTime: 0,
        endTime: 0,
        candidates: candidates,
        eligibleVoters: voters
    }

    const voting = await ethers.deployContract("VotingApplication");
    await voting.waitForDeployment();

    return { accounts, candidateobj1, candidateobj2, pollobj1, pollobj2, voting };
}





describe( "VotingApplication", () => {




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

    it( "Should map the owners address to created polls correctly", async () => {

        const { accounts, voting, pollobj1,  } = await loadFixture(
          deployContractFixture
        );

        await voting.connect(accounts[1]).createPoll(pollobj1);

        const ids= await voting.connect(accounts[1]).getYourPolls();

        expect(ids[0]).to.equals(pollobj1.id);

    } )






    it( "Should allow voting and calculate results correctly ", async () => {

        const { voting, candidateobj1, candidateobj2, pollobj1, accounts } = await loadFixture(deployContractFixture);
        pollobj1.realTimeTally = true;
        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );
        const poll = await ethers.getContractAt( "Poll", pollAddress );

        const d = new Date();

        await poll.connect(accounts[1]).voteCandidate( candidateobj1.id, d.getTime()) ;
        await poll.connect(accounts[2]).voteCandidate( candidateobj1.id, d.getTime())  ;
        await poll.connect(accounts[3]).voteCandidate( candidateobj2.id, d.getTime())  ;


        const result = await poll.getResult( d.getTime()) ;

        const voteCount1 = result[0][1];
        const voteCount2 = result[1][1];

        expect( voteCount1 ).to.equals( 2 );
        expect( voteCount2 ).to.equals( 1 );


    } )





    it( "Should not show result while realTimeTally is set to false", async () => {

        const { voting, candidateobj1, candidateobj2, pollobj1, accounts } = await loadFixture(deployContractFixture);
        pollobj1.realTimeTally = false;
        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );
        const poll = await ethers.getContractAt( "Poll", pollAddress );

        const d = new Date();

        await poll.connect(accounts[1]).voteCandidate( candidateobj1.id, d.getTime()) ;

        let flag = undefined;

        try{
            const result = await poll.getResult( d.getTime()) ;
            flag = false;
        }
        catch{
            flag = true;
        }


        expect(flag).to.be.true;

    } )










    it( "Should prohibit uneligible voters to vote", async () => {

        const { voting, candidateobj1, pollobj1, accounts } = await loadFixture(deployContractFixture);
        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );
        const poll = await ethers.getContractAt( "Poll", pollAddress );

        let flag = undefined;
        const d = new Date();

        try {
            const randomaddress = accounts[6];
            await poll.connect(randomaddress).voteCandidate( candidateobj1.id, d.getTime())  ;
            flag = true;
        } 
        catch (error) {

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
        const d = new Date();

        try {
            await poll.connect(accounts[1]).voteCandidate( candidateobj1.id, d.getTime())  ;
            await poll.connect(accounts[1]).voteCandidate( candidateobj1.id, d.getTime())  ;
            flag = true;
        } 
        catch (error) {

            flag = false;
        }


        expect( flag ).to.false;


    } )








    it( "Should allow automating start time and voting after that time", async () => {

        const { voting, candidateobj1, pollobj1, accounts } = await loadFixture(deployContractFixture);

        const d = new Date();
        pollobj1.isStartAutomated = true;
        pollobj1.startTime = d.getTime() + 500;

        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );
        const poll = await ethers.getContractAt( "Poll", pollAddress );


        const startTime = await poll.startTime();
        expect( startTime ).to.equal( pollobj1.startTime );

        let flag = undefined;
        let p = new Promise( ( resolve ) => {

            setTimeout(async ()=>{
                try {
                    const dd = new Date();
                    await poll.connect(accounts[1]).voteCandidate( candidateobj1.id, dd.getTime())  ;
                    resolve(true);
                } 
                catch (error) {
                    console.log(error);
                    resolve(false);
                }
            }, 1200 );
        } )


        flag = await p;
        expect( flag ).to.true;
    } )







    it( "Should not allow voting before start time", async () => {

        const { voting, candidateobj1, pollobj1, accounts } = await loadFixture(deployContractFixture);

        const d = new Date();
        pollobj1.isStartAutomated = true;
        pollobj1.startTime = d.getTime() + 1000;

        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );
        const poll = await ethers.getContractAt( "Poll", pollAddress );

        let flag = false;
        let p = new Promise( ( resolve ) => {

            setTimeout(async ()=>{
                try {
                    await poll.connect(accounts[1]).voteCandidate( candidateobj1.id, d.getTime())  ;
                    resolve(true);
                }
                catch (error) {
                    resolve(false);
                }
            }, 1200 );
        } )

        flag = await p;

        expect( flag ).to.false;


    } )





    it( "Should allow automating end time and voting before that time", async () => {

        const { voting, candidateobj1, pollobj1, accounts } = await loadFixture(deployContractFixture);

        const d = new Date();
        pollobj1.isEndAutomated = true;
        pollobj1.endTime = d.getTime() + 1000;

        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );
        const poll = await ethers.getContractAt( "Poll", pollAddress );


        let flag = undefined;
        let p = new Promise( ( resolve ) => {

            setTimeout(async ()=>{
                try {
                    await poll.connect(accounts[1]).voteCandidate( candidateobj1.id, d.getTime())  ;
                    resolve(true);
                } 
                catch (error) {
                    console.log(error);
                    resolve(false);
                }
            }, 100 );
        } )


        flag = await p;
        expect( flag ).to.true;
    } )







    it( "Should not allow voting after end time", async () => {

        const { voting, candidateobj1, pollobj1, accounts } = await loadFixture(deployContractFixture);

        const d = new Date();
        pollobj1.isEndAutomated = true;
        pollobj1.endTime = d.getTime() + 50;

        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );
        const poll = await ethers.getContractAt( "Poll", pollAddress );


        let flag = undefined;
        let p = new Promise( ( resolve ) => {

            setTimeout(async ()=>{
                try {
                    await poll.connect(accounts[1]).voteCandidate( candidateobj1.id, d.getTime())  ;
                    resolve(true);
                } 
                catch (error) {
                    resolve(false);
                }
            }, 100 );
        } )


        flag = await p;
        expect( flag ).to.true;
    } )




    it( "Should allow manually ending the poll", async () => {

        const { voting, candidateobj1, pollobj1, accounts } = await loadFixture(deployContractFixture);

        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );
        const poll = await ethers.getContractAt( "Poll", pollAddress );


        const d = new Date();
        const endtime = d.getTime();


        await poll.endPoll( endtime );

        const f = await poll.endTime();

        expect( Number(f) ).to.be.equal( endtime );
    } )



    it( "Should not allow to vote after manually ending the poll", async () => {

        const { voting, candidateobj1, pollobj1, accounts } = await loadFixture(deployContractFixture);

        await voting.createPoll(pollobj1);
        const pollAddress = await voting.polls( pollobj1.id );
        const poll = await ethers.getContractAt( "Poll", pollAddress );


        const d = new Date();
        const endtime = d.getTime();


        await poll.endPoll( endtime );

        let flag = undefined;
        let p = new Promise( ( resolve ) => {

            setTimeout(async ()=>{
                const dd = new Date();
                try {
                    await poll.connect(accounts[1]).voteCandidate( candidateobj1.id, dd.getTime())  ;
                    resolve(false);
                } 
                catch (error) {
                    resolve(true);
                }
            }, 100 );
        } )


        flag = await p;

        expect( flag  ).to.be.true;
    } )



} )
