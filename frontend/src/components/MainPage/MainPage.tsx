import { Outlet } from "react-router-dom";
import WalletStatus from "../WalletStatus/WalletStatus";
import { useContext, useEffect, useMemo, useState } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import { ethers } from "ethers";


import deployedaddresses from "../../artifacts/contract-address.json";
import {abi} from "../../artifacts/VotingApplication.json";
import { VotingAppContextProvider } from "../../contexts/VotingAppContext";



const MainPage = () => {

  const {signer, signerAddress} = useContext(WalletContext);

  const [totalPollCount, setTotalPollCount] = useState(0);
  const [poll, setPoll] = useState(undefined);
  const [myPolls, setMyPolls] = useState([]);
   


  const VotingApplication = useMemo(() => {
    return new ethers.Contract(
      deployedaddresses["VotingApplication"],
      abi,
      signer,
    );
  }, [signer]);



  useEffect(() => {
    const x = setInterval(() => {
      const getTotalPollCount = async () => {
        const _totalPollCount = await VotingApplication.pollCount();
        setTotalPollCount(_totalPollCount);
      }
      getTotalPollCount();

      const getPolls = async ()=>{
        const _myPolls = await VotingApplication.getYourPolls();
        setMyPolls(_myPolls);
      };
      getPolls();
    }, 5000);
    return ()=>clearInterval(x)
  }, [signer, signerAddress, VotingApplication]);



  const createNewPoll = async () => {
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
      id: "uuid1" + (new Date).getTime(),
      realTimeTally: true,
      isStartAutomated: false,
      isEndAutomated: false,
      startTime: 0,
      endTime: 0,
      candidates: candidates,
      eligibleVoters: [signerAddress]
    }


    const txn = await VotingApplication.createPoll(pollobj1);
    console.log(txn);
  }

  const getPollAddress = async ( id: string ) => {
    const _poll = await VotingApplication.poll( id );
    setPoll( _poll );
  }



    return (
      <div className="h-full w-full flex flex-col items-center">
        <WalletStatus />
        {//myPolls + " | " + totalPollCount + " | " + poll
      }
        <VotingAppContextProvider value={{poll, myPolls, totalPollCount, createNewPoll, getPollAddress }}>
          <Outlet />
        </VotingAppContextProvider>
      </div>
    );
}


export default MainPage;
