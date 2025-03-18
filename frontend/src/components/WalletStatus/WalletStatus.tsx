import { useContext } from "react";
import { WalletContext } from "../../contexts/WalletAddressContext";





const WalletStatus = () => {


    const { walletAddress, disconnectWallet } = useContext(WalletContext);


    return (
      //<div className="flex justify-between bg-green-400 items-center font-bold">
      <div
        className="my-2 w-full rounded-lg
                    flex justify-between items-center 
                    font-bold bg-gradient-to-r from-green-300 via-green-200 to-green-300 text-gray-900"
      >
        <div className="mx-8 my-4">
          Wallet Address: <br />
          {walletAddress}
        </div>
        <button
          onClick={disconnectWallet}
          className="mx-8 my-4 border-2 rounded-md border-black bg-indigo-300 hover:bg-indigo-400 px-4 py-2"
        >
          Disconnect
        </button>
      </div>
    );
}


export default WalletStatus;
