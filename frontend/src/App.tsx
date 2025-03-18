import { ethers } from "ethers";
import { useState } from "react";

import "./index.css";
import { WalletContextProvider } from "./contexts/WalletAddressContext";
import ConnectWallet from "./components/ConnectWallet/ConnectWallet";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import WalletStatus from "./components/WalletStatus/WalletStatus";
import MainPage from "./components/MainPage/MainPage";
import ListPolls from "./components/ListPolls/ListPolls";









function App() {



  const [walletAddress, setWalletAddress] = useState("");

  const connectMetamaskWallet = async () => {

    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);

    await window.ethereum?.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });

    const signer = await provider.getSigner();
    const _walletAddress = await signer.getAddress();
    setWalletAddress(_walletAddress);
  };

  const disconnectWallet = () => {
    setWalletAddress("");
  };








  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element=<MainPage />>
        <Route path="" element=<ListPolls /> />
      </Route>,
    ),
  );



  return (
      <WalletContextProvider value={{ walletAddress, connectMetamaskWallet, disconnectWallet }}>
        <div className="p-2 h-screen w-screen flex flex-col items-center bg-gradient-to-br from-indigo-200 via-indigo-300 to-indigo-400 text-gray-900">
          {walletAddress == "" ? (
            <ConnectWallet />
          ) : (
            <RouterProvider router={router} />
          )}
        </div>
      </WalletContextProvider>
  );
}

export default App;
