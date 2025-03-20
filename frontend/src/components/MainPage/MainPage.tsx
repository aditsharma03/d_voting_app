import { Outlet } from "react-router-dom";
import WalletStatus from "../WalletStatus/WalletStatus";
import { useContext } from "react";
import { WalletContext } from "../../contexts/WalletAddressContext";
import { ethers } from "ethers";


//import deployedaddresses from "../../artifacts/deployed_addresses.json";
//import {abi} from "../../artifacts/VotingApplication.json";



const MainPage = () => {

  const {signer} = useContext(WalletContext);

  //const VotingApplication =  new ethers.Contract( deployedaddresses["VotingApplicationModule#VotingApplication"],
  //abi, signer );


    return (

        <div className="w-full h-full flex flex-col items-center">
            <WalletStatus />
            <Outlet />
        </div>
    );
}


export default MainPage;
