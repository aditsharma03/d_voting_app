import { useContext } from "react";
import { WalletContext } from "../../contexts/WalletAddressContext";

const ConnectWallet = () => {
  const { connectMetamaskWallet } = useContext(WalletContext);

  return (
      <div className="flex items-center justify-center min-h-screen text-center px-4">
        <div className="bg-gray-100 bg-opacity-95 shadow-2xl p-6 md:p-12 max-w-7xl w-full h-auto flex flex-col justify-between items-center rounded-lg backdrop-blur-md">
          <h1 className="mb-6 text-3xl md:text-4xl font-semibold text-gray-900">
            Secure Blockchain Voting
          </h1>
          <p className="text-gray-800 w-full md:w-3/4 text-lg md:text-xl text-justify font-medium leading-relaxed mt-4">
            A decentralized, tamper-proof voting system ensuring transparency
            and fairness in elections. Our platform leverages blockchain
            technology to secure votes and maintain integrity. With our
            innovative approach, we eliminate voter fraud, enhance
            accessibility, and empower citizens to participate in elections with
            confidence and security.
          </p>
          <ul className="text-gray-800 w-full md:w-3/4 text-lg text-justify flex  justify-center space-x-4 md:space-x-8 mt-6 font-medium">
            <li className="flex items-center">
              <span className="mr-2">•</span>Tamper-proof Security
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>Transparent Process
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>Decentralized Network
            </li>
          </ul>
          <button onClick={connectMetamaskWallet} className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 px-6 md:px-8 shadow-lg text-lg rounded-md mt-8">
            Connect Wallet
          </button>
        </div>
    </div>
  );
};

export default ConnectWallet;
