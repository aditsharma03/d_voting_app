import { ethers } from "ethers";
import { useState } from "react";

import "./index.css";
import {WalletContextProvider} from "./contexts/WalletContext.ts"
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
import CreatePoll from "./components/CreatePoll/CreatePoll.tsx";
import WalletStatus from "./components/WalletStatus/WalletStatus.tsx";









function App() {

  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [signerAddress, setSignerAddress] = useState<string|undefined>();


  const connectMetamaskWallet = async () => {

    if (!window.ethereum) return;

    const provider =  new ethers.BrowserProvider(window.ethereum);

    await window.ethereum?.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });

    const _signer = await provider.getSigner();
    setSigner(_signer);
    const _signerAddress = await _signer.getAddress();
    setSignerAddress(_signerAddress);
  };


  const disconnectWallet = () => {
    setSigner(undefined);
  };








  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element=<MainPage />>
        <Route path="" element=<ListPolls /> />
        <Route path="createpoll" element=<CreatePoll /> />
      </Route>,
    ),
  );



  return (
    <WalletContextProvider
      value={{ signer, signerAddress, connectMetamaskWallet, disconnectWallet }}
    >
      <div className="p-2 md:p-6 min-h-dvh w-dvw overflow-scroll  bg-gradient-to-br from-indigo-200 via-indigo-300 to-indigo-400 text-gray-900">
      {signer == undefined ? (
        <ConnectWallet />
      ) : (
        <>
          <WalletStatus />
          <div className="p-4 w-full h-full flex flex-col justify-center items-center">
            <RouterProvider router={router} />
          </div>
        </>
      )}
      </div>
    </WalletContextProvider>
  );
}

export default App;
