import { Outlet } from "react-router-dom";
import WalletStatus from "../WalletStatus/WalletStatus";
import { useContext, useEffect, useMemo, useState } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import { ethers } from "ethers";


import deployedaddresses from "../../artifacts/contract-address.json";
import {abi} from "../../artifacts/VotingApplication.json";



const MainPage = () => {

  const {signer, signerAddress} = useContext(WalletContext);
  const [pollCount, setPollCount] = useState(9999);
  const [myPolls, setMyPolls] = useState();
   


  const VotingApplication = useMemo(() => {
    return new ethers.Contract(
      deployedaddresses["VotingApplication"],
      abi,
      signer,
    );
  }, [signer]);



  useEffect(() => {
    const x = setInterval(() => {
      const getPollCount = async () => {
        const _pollCount = await VotingApplication.pollCount();
        setPollCount(_pollCount);

        //const _myPolls = await VotingApplication.owners(signerAddress);
        //setMyPolls(_polls);
        
        
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

    const pollobj1 = {
        id: "uuid1"+(new Date).getTime(),
        realTimeTally: true,
        isStartAutomated: false,
        isEndAutomated: false,
        startTime: 0,
        endTime: 0,
        candidates: candidates,
        eligibleVoters: [signerAddress]
    }
        
        
        const txn = await VotingApplication.createPoll(pollobj1);
       setMyPolls(txn);
        
        
        
      };
      getPollCount();
    }, 5000);
    return ()=>clearInterval(x)
  }, [signer, signerAddress, VotingApplication]);





    return (

        <div className="h-full w-full flex flex-col items-center">
            <WalletStatus />
      {pollCount}
      {JSON.stringify(myPolls)}
            <Outlet />
        </div>
    );
}


export default MainPage;
