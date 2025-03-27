import { createContext } from "react";
import { PollInterface } from "../components/CreatePoll/CreatePoll";

interface VotingAppContextType {
  totalPollCount: number;
  poll: string | undefined;
  myPolls: string[];
  createNewPoll: (_:PollInterface|undefined) => Promise<void>;
  getPollAddress: ( _:string ) => Promise<void>;
}

const VotingAppContext = createContext<VotingAppContextType>({
  totalPollCount: 0,
  poll: undefined,
  myPolls: [],
  createNewPoll: (_: PollInterface| undefined) => Promise.resolve(),
  getPollAddress: ( _:string ) => Promise.resolve(),
});

const VotingAppContextProvider = VotingAppContext.Provider;

export { VotingAppContext, VotingAppContextProvider };
