import { JsonRpcSigner } from "ethers";
import { createContext } from "react";

interface WalletContextType {
  signer: JsonRpcSigner | undefined;
  signerAddress: string | undefined;
  connectMetamaskWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType>({
  signer: undefined,
  signerAddress: "",
  connectMetamaskWallet: () => Promise.resolve(),
  disconnectWallet: () => {},
});

const WalletContextProvider = WalletContext.Provider;

export { WalletContext, WalletContextProvider };
