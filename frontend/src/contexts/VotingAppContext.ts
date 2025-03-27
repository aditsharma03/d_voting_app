import { createContext } from "react";

interface VotingAppContextType {
  totalPollCount: number;
  poll: string | undefined;
  myPolls: string[];
  createNewPoll: () => Promise<void>;
  getPollAddress: ( _:string ) => Promise<void>;
}

const VotingAppContext = createContext<VotingAppContextType>({
  totalPollCount: 0,
  poll: undefined,
  myPolls: [],
  createNewPoll: () => Promise.resolve(),
  getPollAddress: ( _:string ) => Promise.resolve(),
});

const VotingAppContextProvider = VotingAppContext.Provider;

export { VotingAppContext, VotingAppContextProvider };
