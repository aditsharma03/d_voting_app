import { useContext, useEffect, useMemo, useState } from "react";
import { VotingAppContext } from "../../contexts/VotingAppContext";
import { ethers } from "ethers";
import { WalletContext } from "../../contexts/WalletContext";
import { CandidateInterface } from "../CreatePoll/CreatePoll";
import CollapsableSection from "./CollapsableSection";


const undefinedAddress = "0x0000000000000000000000000000000000000000";
import { abi } from "../../artifacts/Poll.json";





interface ResultInterface {
  candidate_id: string;
  voteCount: number;
}






const Ballot = () => {

  const { signer, signerAddress } = useContext(WalletContext);
  const { pollAddress, clearPollAddress } = useContext(VotingAppContext);

  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [pollId, setPollId] = useState<string>("");
  const [realTimeTally, setRealTimeTally] = useState<boolean>(false);
  const [candidateCount, setCandidateCount] = useState<number>(0);
  const [candidates, setCandidates] = useState<CandidateInterface[]>([]);

  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const [result, setResult] = useState<ResultInterface[]|undefined>(undefined);
  const [winnerId, setWinnerId] = useState<string|undefined>(undefined);


  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();
  const [hasEnded, setHasEnded] = useState<boolean>(false);





  const Poll = useMemo(() => {
    return new ethers.Contract(pollAddress, abi, signer);
  }, [signer, pollAddress]);





  useEffect(() => {
    const getIsOwner = async () => {
      const _isOwner = await Poll.owner();
      setIsOwner(_isOwner === signerAddress);
    };
    const getPollId = async () => {
      const _id = await Poll.id();
      setPollId(_id);
    };
    const getRealTimeTally = async () => {
      const _realTimeTally = await Poll.realTimeTally();
      setRealTimeTally(_realTimeTally);
    };
    const getCandidateCount = async () => {
      const _candidateCount = await Poll.candidateCount();
      setCandidateCount(_candidateCount);
    };
    const getCandidates = async () => {
      getCandidateCount();
      const _candidates = [];
      for (let i = 0; i < candidateCount; i++) {
        const _candidate = await Poll.candidates(i);
        _candidates.push(_candidate);
      }
      setCandidates(_candidates);
    };
    const getIsEligible = async () => {
      const _isEligible = await Poll.checkEligibility();
      setIsEligible(_isEligible);
    };
    const getHasVoted = async () => {
      const _hasVoted = await Poll.checkAlreadyVoted();
      setHasVoted(_hasVoted);
    };
    const getStartTime = async () => {
      const _startTime = await Poll.startTime();
      setStartTime(_startTime);
    }
    getIsOwner();
    getPollId();
    getRealTimeTally();
    getCandidates();
    getIsEligible();
    getHasVoted();
    getStartTime();

  }, [Poll, candidateCount, signerAddress]);


  useEffect( ()=>{

    const getEndTime = async () => {
      const _endTime = await Poll.endTime();
      setEndTime(_endTime);
    }
    getEndTime();

    const updateHasEnded = () => {
      getEndTime();
      if( endTime ){
       setHasEnded( endTime < (new Date().getTime()) )
      }
    }

    const getResult = async () => {

      updateHasEnded();
      const _result = await Poll.getResult( (new Date).getTime() )
      setResult(_result);

      let maxvotecount = -1;
      result?.forEach( ( element: ResultInterface ) => {
        if( element.voteCount > maxvotecount ){
          maxvotecount = element.voteCount;
          setWinnerId(element.candidate_id)
        }
      } )
    }

    const x = setInterval( ()=>{
      if( hasEnded || realTimeTally ){
        getResult();
      }
      if( hasEnded ){
        clearInterval(x);
      }
    }, 1000 )


    return ()=> clearInterval(x);

  }, [Poll, result, hasEnded, realTimeTally, endTime] )







  return (
    <div className="p-4 w-full md:max-w-[80rem] bg-white rounded-lg">
      <div className="w-full flex flex-col items-center sm:flex-row sm:justify-between">
        <span className="p-2 text-xs font-semibold">{pollAddress}</span>
        <button
          onClick={clearPollAddress}
          className="p-2 w-1/2 max-w-52  bg-blue-600 text-white rounded-lg"
        >
          Go back
        </button>
      </div>
      {pollAddress === undefinedAddress || pollAddress === "" ? (
        <div>
          This Poll does not exist, try validating the entered id or contact
          your provider.
        </div>
      ) : (
        <div>
          {isOwner && (
            <CollapsableSection title={"Poll Config"}>
                <div className="p-8 text-zinc-500 bg-zinc-100 rounded-lg tracking-widest text-lg flex flex-col gap-4">
                  <div>id: <span className="font-semibold py-2 px-4 bg-indigo-100">{pollId}</span></div>
                  <div>realTimeTally: <span className="font-semibold py-2 px-4 bg-indigo-100" >{realTimeTally.toString()}</span></div>
                  <div>startTime: <span className="font-semibold py-2 px-4 bg-indigo-100" >{startTime}</span></div>
                  <div>endTime: <span className="font-semibold py-2 px-4 bg-indigo-100" >{endTime}</span></div>
                  <div>candidateCount: <span className="font-semibold py-2 px-4 bg-indigo-100" >{candidateCount}</span></div>
                  <div>result: 
                    <div>
                      <table className="p-2 w-full max-h-36 border text-xs bg-white">
                        <thead>
                          <tr>
                            <th className="border p-2">Id</th>
                            <th className="border p-2">VoteCount</th>
                          </tr>
                        </thead>
                        <tbody>
                          { result?.map(( element, index ) => (
                            <tr key={index}>
                              <td className="border p-2">{element.candidate_id}</td>
                              <td className="border p-2">{element.voteCount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>winner: <span className="font-semibold py-2 px-4 bg-indigo-100" >{winnerId}</span></div>
                  {
                    !hasEnded && (
                    <div>
                        <button
                          onClick={async () => await Poll.endPoll( new Date().getTime() )}
                          className="my-8 py-2 px-4 bg-red-200 text-red-600 border-2 border-red-500 rounded-md"
                        >End Poll</button>
                        
                      </div>
                    )
                  }
                </div>
            </CollapsableSection>
          )}
          <div className="mt-8 p-2 w-full">
            <h2 className="font-bold text-2xl tracking-widest">Voting Ballot - {pollId}</h2>
          </div>
          <div>
            { hasEnded && (
              <div className="my-8 font-semibold bg-indigo-200 text-indigo-500 border-4 border-indigo-500 px-6 py-8 rounded-lg">
                This poll has ended
              </div>
            )}
            {!isEligible && (
              <div className="my-8 font-semibold bg-red-300 text-red-600 border-4 border-red-600 px-6 py-8 rounded-lg">
                Warning: You are not eligible to participate in this poll
              </div>
            )}
            {hasVoted && (
              <div className="my-8 font-semibold bg-yellow-50 text-yellow-600 border-4 border-yellow-600 px-6 py-8 rounded-lg">
                You have already casted your vote.
              </div>
            )}
            <table className="p-2 w-full max-h-36 border">
              <thead>
                <tr>
                  <th className="border p-2">Id</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr key={index}>
                    <td className="border p-2">{candidate.id}</td>
                    <td className="border p-2">{candidate.name}</td>
                    <td className="border p-2">{candidate.description}</td>
                    <td className="border p-2 flex items-center justify-center">
                      <input
                        type="button"
                        onClick={async () => {
                          await Poll.voteCandidate(
                            candidate.id,
                            new Date().getTime(),
                          );
                          setHasVoted(true);
                        }}
                        disabled={!isEligible || hasVoted || hasEnded }
                        className={` ${!isEligible || hasVoted || hasEnded ? "bg-gray-500" : "bg-green-400"} px-4 py-2 rounded-lg mr-2`}
                        value={"Vote"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ballot;
