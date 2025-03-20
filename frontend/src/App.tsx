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
import MainPage from "./components/MainPage/MainPage";
import ListPolls from "./components/ListPolls/ListPolls";
import { JsonRpcSigner } from "ethers";









function App() {

  const [signer, setSigner] = useState<JsonRpcSigner>();


  const connectMetamaskWallet = async () => {

    if (!window.ethereum) return;

    const provider = await new ethers.BrowserProvider(window.ethereum);

    await window.ethereum?.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });

    const _signer = await provider.getSigner();
    setSigner(_signer);
  };


  const disconnectWallet = () => {
    setSigner(undefined);
  };








  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element=<MainPage />>
        <Route path="" element=<ListPolls /> />
      </Route>,
    ),
  );



  return (
      <WalletContextProvider value={{ signer, connectMetamaskWallet, disconnectWallet }}>
        <div className="p-2 h-screen w-screen flex flex-col items-center bg-gradient-to-br from-indigo-200 via-indigo-300 to-indigo-400 text-gray-900">
          {signer == undefined ? (
            <ConnectWallet />
          ) : (
            <RouterProvider router={router} />
          )}
        </div>
      </WalletContextProvider>
  );
}

export default App;
