import { createContext } from "react";
import { PollInterface } from "../components/CreatePoll/CreatePoll";

interface VotingAppContextType {
  totalPollCount: number;
  pollAddress: string;
  getPollAddress: ( _:string ) => Promise<void>;
  clearPollAddress: ()=>void;
  myPolls: string[];
  createNewPoll: (_:PollInterface|undefined) => Promise<void>;
}

const VotingAppContext = createContext<VotingAppContextType>({
    totalPollCount: 0,
    pollAddress: "",
    myPolls: [],
    createNewPoll: (_: PollInterface | undefined) => Promise.resolve(),
    getPollAddress: (_: string) => Promise.resolve(),
    clearPollAddress: function(): void {
        throw new Error("Function not implemented.");
    }
});

const VotingAppContextProvider = VotingAppContext.Provider;

export { VotingAppContext, VotingAppContextProvider };
