import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import { ethers } from "ethers";


import deployedaddresses from "../../artifacts/contract-address.json";
import {abi} from "../../artifacts/VotingApplication.json";
import { VotingAppContextProvider } from "../../contexts/VotingAppContext";
import { PollInterface } from "../CreatePoll/CreatePoll";



const MainPage = () => {

  const {signer, signerAddress} = useContext(WalletContext);

  const [totalPollCount, setTotalPollCount] = useState(0);
  const [poll, setPoll] = useState(undefined);
  const [myPolls, setMyPolls] = useState([]);
   
  const navigate = useNavigate();


  const VotingApplication = useMemo(() => {
    return new ethers.Contract(
      deployedaddresses["VotingApplication"],
      abi,
      signer,
    );
  }, [signer]);



  useEffect(() => {
    const handlerFunction = () => {
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
    } 

    const x = setInterval( handlerFunction, 2000 );
    handlerFunction();
    return ()=>clearInterval(x)
  }, [signer, signerAddress, VotingApplication]);



  const createNewPoll = async ( pollobj: PollInterface|undefined ) => {
    if( pollobj === undefined ) return;

    const txn = await VotingApplication.createPoll(pollobj);
    console.log(txn);
    navigate("/");
    
  }

  const getPollAddress = async ( id: string ) => {
    const _poll = await VotingApplication.poll( id );
    setPoll( _poll );
  }





  return (
    <VotingAppContextProvider value={{ poll, myPolls, totalPollCount, createNewPoll, getPollAddress }} >
      <div className="h-full w-full flex flex-col items-center">
        {
          //myPolls + " | " + totalPollCount + " | " + poll
        }
        <Outlet />
      </div>
    </VotingAppContextProvider>
  );
}


export default MainPage;
