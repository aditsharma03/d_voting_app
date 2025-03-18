import { createContext } from "react";



export const WalletContext = createContext({
    walletAddress: "",
    connectMetamaskWallet: async () => {},
    disconnectWallet: () => {},
});



export const WalletContextProvider = WalletContext.Provider;




