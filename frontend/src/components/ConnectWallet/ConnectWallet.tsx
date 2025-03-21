import { useContext } from "react";
import { WalletContext } from "../../contexts/WalletContext";

const ConnectWallet = () => {
  const { connectMetamaskWallet } = useContext(WalletContext);

  return (
      <div className="flex h-full items-center justify-center text-center">
        <div
        className="flex flex-col  h-full w-full sm:h-5/6 sm:w-5/6 md:h-auto md:w-3/4 lg:w-1/2 gap-8 items-center justify-center 
                 overflow-hidden  rounded-lg bg-gray-100 p-8 shadow-2xl md:p-12">
          <h1 className="my-2 text-2xl font-bold text-gray-900 md:text-4xl">
            Secure Blockchain Voting
          </h1>
          <p className="my-2 w-full text-justify md:text-2xl font-medium text-gray-700 tracking-wide ">
            A decentralized, tamper-proof voting system ensuring transparency
            and fairness in elections. Our platform leverages blockchain
            technology to secure votes and maintain integrity. With our
            innovative approach, we eliminate voter fraud, enhance
            accessibility, and empower citizens to participate in elections with
            confidence and security.
          </p>
          <ul className="my-2 flex flex-col md:flex-row items-center justify-center gap-4 text-lg w-full text-justify font-semibold text-gray-400">
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
        <a href="https://metamask.io" className="text-blue-800 underline"><span>click here to get metamask wallet</span></a>
        </div>
    </div>
  );
};

export default ConnectWallet;
