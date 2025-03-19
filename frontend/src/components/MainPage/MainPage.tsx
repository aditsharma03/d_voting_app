import { Outlet } from "react-router-dom";
import WalletStatus from "../WalletStatus/WalletStatus";
import { useContext } from "react";
import { WalletContext } from "../../contexts/WalletAddressContext";
import { ethers } from "ethers";


import deployedaddress from "../../deployments/chain-1337/deployed_addresses.json"
//import votingdata from "../../deployments/chain-1337/artifacts/VotingApplicationModule#VotingApplication.json"
import {abi} from '../../deployments/chain-1337/artifacts/VotingApplicationModule\#VotingApplication.json';




const MainPage = () => {

  const {signer} = useContext(WalletContext);

  const VotingApplication =  new ethers.Contract( deployedaddress["VotingApplicationModule#VotingApplication"],
  abi, signer );


    return (

        <div className="w-full h-full flex flex-col items-center">
            <WalletStatus />
            <Outlet />
        </div>
    );
}


export default MainPage;
