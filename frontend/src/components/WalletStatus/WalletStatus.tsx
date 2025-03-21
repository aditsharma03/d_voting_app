import { useContext } from "react";
import { WalletContext } from "../../contexts/WalletContext";

const WalletStatus = () => {
  const { signerAddress, disconnectWallet } = useContext(WalletContext);

  return (
    <div
      className="my-2 w-full rounded-lg
                    flex flex-col sm:flex-row justify-between items-center
                    font-bold text-xs md:text-lg
                    bg-gradient-to-r from-green-400 via-green-300 to-green-400 bg-opacity-65 text-gray-800"
    >
      <div className="m-2 px-2 w-full">
        <span>Wallet Address:</span>
        <br />
        {signerAddress}
      </div>
      <button
        onClick={disconnectWallet}
        className="m-2 h-fit  border-2 text-sm rounded-md border-black bg-green-100 hover:bg-green-200 px-4 py-2"
      >
        Disconnect
      </button>
    </div>
  );
};

export default WalletStatus;
