import { Outlet } from "react-router-dom";
import WalletStatus from "../WalletStatus/WalletStatus";
import { useContext, useEffect, useMemo, useState } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import { ethers } from "ethers";


import deployedaddresses from "../../artifacts/deployed_addresses.json";
import {abi} from "../../artifacts/VotingApplication.json";



const MainPage = () => {

  const {signer} = useContext(WalletContext);
  const [pollCount, setPollCount] = useState(9999);
   


  const VotingApplication = useMemo(() => {
    return new ethers.Contract(
      deployedaddresses["VotingApplicationModule#VotingApplication"],
      abi,
      signer,
    );
  }, [signer]);



  useEffect(() => {
    const x = setInterval(() => {
      const getPollCount = async () => {
        const _pollCount = await VotingApplication.pollCount();
        setPollCount(_pollCount);
      };
      getPollCount();
    }, 10000);
    return ()=>clearInterval(x)
  }, [signer, VotingApplication]);





    return (

        <div className="h-full w-full flex flex-col items-center">
            <WalletStatus />
            <Outlet />
        </div>
    );
}


export default MainPage;
