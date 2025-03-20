import { JsonRpcSigner } from "ethers";
import { createContext } from "react";


interface WalletContextType {
  signer: JsonRpcSigner | undefined,
  connectMetamaskWallet:  () => Promise<void>,
  disconnectWallet: () => void,
}


export const WalletContext = createContext<WalletContextType>({
    signer: undefined,
    connectMetamaskWallet:  () => Promise.resolve(),
    disconnectWallet: () => {},
});



export const WalletContextProvider = WalletContext.Provider;




