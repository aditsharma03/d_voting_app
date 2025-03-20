import { useContext } from "react";
import { WalletContext } from "../../contexts/WalletContext";

const ConnectWallet = () => {
  const { connectMetamaskWallet } = useContext(WalletContext);

  return (
      <div className="flex h-full items-center justify-center text-center">
        <div
        className="flex h-full md:h-auto md:w-3/5 flex-col gap-8 items-center justify-center 
                   rounded-lg bg-gray-100 p-8 m-4 shadow-2xl md:p-12">
          <h1 className="my-2 text-2xl font-bold text-gray-900 md:text-4xl">
            Secure Blockchain Voting
          </h1>
          <p className="my-2 w-full text-justify font-medium text-gray-700 tracking-wide ">
            A decentralized, tamper-proof voting system ensuring transparency
            and fairness in elections. Our platform leverages blockchain
            technology to secure votes and maintain integrity. With our
            innovative approach, we eliminate voter fraud, enhance
            accessibility, and empower citizens to participate in elections with
            confidence and security.
          </p>
          <ul className=" my-2 flex flex-col lg:flex-row items-center justify-center gap-4 text-lg w-full text-justify font-semibold text-gray-400">
            <li className="flex items-center">
              Tamper-proof Security
            </li>
            <li className="flex items-center">
              Transparent Process
            </li>
            <li className="flex items-center">
              Decentralized Network
            </li>
          </ul>
          <button onClick={connectMetamaskWallet} className=" rounded-md bg-indigo-700 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-indigo-800 md:px-8">
            Connect Wallet
          </button>
        </div>
    </div>
  );
};

export default ConnectWallet;
