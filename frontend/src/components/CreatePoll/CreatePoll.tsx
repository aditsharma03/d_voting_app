import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { VotingAppContext } from "../../contexts/VotingAppContext";

interface CandidateInterface {
  id: string;
  name: string;
  description: string;
}

export interface PollInterface {
  id: string;
  realTimeTally: boolean;
  isStartAutomated: boolean;
  isEndAutomated: boolean;
  startTime: number;
  endTime: number;
  candidates: CandidateInterface[];
  eligibleVoters: string[];
}

const CreatePoll = () => {
  const { createNewPoll } = useContext(VotingAppContext);

  const [pollId, setPollId] = useState<string>("");
  const [realTimeTally, setRealTimeTally] = useState<boolean>(false);
  const [isStartAutomated, setIsStartAutomated] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [isEndAutomated, setIsEndAutomated] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<string>("");
  const [candidates, setCandidates] = useState<CandidateInterface[]>([]);
  const [voters, setVoters] = useState<string[]>([]);

  const [isEdit, setIsEdit] = useState<number>(-1);

  const [candidateId, setCandidateId] = useState<string>("");
  const [candidateName, setCandidateName] = useState<string>("");
  const [candidateDescription, setCandidateDescription] = useState<string>("");

  const [voterAddress, setVoterAddress] = useState<string>("");

  const addCandidateHandler = () => {
    if (candidateName === "" || candidateDescription === "") return;

    const _candidate = {
      id: candidateId,
      name: candidateName,
      description: candidateDescription,
    };

    if (isEdit == -1) {
      setCandidates([...candidates, _candidate]);
    } else if (isEdit < candidates.length) {
      setCandidates(
        candidates.map((item, i) => (i === isEdit ? _candidate : item)),
      );
      setIsEdit(-1);
    }

    setCandidateId("");
    setCandidateName("");
    setCandidateDescription("");
  };

  const editCandidateHandler = (index: number = -1) => {
    if (index == -1) return;

    setCandidateName(candidates[index].name);
    setCandidateDescription(candidates[index].description);
    setIsEdit(index);
  };

  const deleteCandidateHandler = (index: number) => {
    setCandidates(candidates.filter((_, i) => i !== index));
  };

  const addVoterHandler = () => {
    if (voterAddress === "") return;

    setVoters([...voters, voterAddress]);
    setVoterAddress("");
  };

  const deleteVoterHandler = (index: number) => {
    setVoters(voters.filter((_, i) => i !== index));
  };







  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    let _startTime = 0;
    let _endTime = 0;
    
    if(isStartAutomated) _startTime = new Date(startDate).getTime();
    if(isEndAutomated) _endTime = new Date(endDate).getTime();

    const pollobj: PollInterface = {
      id: pollId,
      realTimeTally: realTimeTally,
      isStartAutomated: isStartAutomated,
      isEndAutomated: isEndAutomated,
      startTime: _startTime,
      endTime: _endTime,
      candidates: candidates,
      eligibleVoters: voters,
    };

    await createNewPoll(pollobj);
  };

  return (
    <div className="max-w-4xl w-full p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between">
        <h2 className="text-2xl font-bold mb-4">Create New Poll</h2>
        <Link to={"/"} className="py-2 text-blue-700 underline">
          go back
        </Link>
      </div>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="mb-4">
          <label className="block">Election ID:</label>
          <input
            type="text"
            value={pollId}
            onChange={(e) => setPollId(e.target.value)}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={realTimeTally}
              onChange={() => setRealTimeTally(!realTimeTally)}
              className="mr-2"
            />
            Enable Real-Time Tally
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isStartAutomated}
              onChange={() => setIsStartAutomated(!isStartAutomated)}
              className="mr-2"
            />
            Automate Start Time
          </label>
          {isStartAutomated && (
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().split("T")[0]}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 w-full rounded-lg mt-2"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isEndAutomated}
              onChange={() => setIsEndAutomated(!isEndAutomated)}
              className="mr-2"
            />
            Automate End Time
          </label>
          {isEndAutomated && (
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 w-full rounded-lg mt-2"
            />
          )}
        </div>
        <h3 className="text-xl font-bold mt-4">Candidates</h3>
        <table className="w-full max-h-36 border mt-2">
          <thead>
            <tr>
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
                <td className="border p-2">
                  <button
                    onClick={() => editCandidateHandler(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCandidateHandler(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 flex flex-col gap-2">
          <input
            type="text"
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
            placeholder="Candidate Id"
            className="border p-2 rounded-lg mr-2"
          />
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Candidate Name"
            className="border p-2 rounded-lg mr-2"
          />
          <textarea
            value={candidateDescription}
            onChange={(e) => setCandidateDescription(e.target.value)}
            placeholder="Candidate Description"
            className="border p-2 rounded-lg mr-2"
          />
          <button
            onClick={() => addCandidateHandler()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Candidate{" "}
          </button>
        </div>
        <h3 className="text-xl font-bold mt-4">Eligible Voters</h3>
        <table className="w-full border mt-2">
          <thead>
            <tr>
              <th className="border p-2">Wallet Address</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {voters?.map((voter, index) => (
              <tr key={index}>
                <td className="border p-2">{voter}</td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteVoterHandler(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 flex flex-col">
          <input
            type="text"
            value={voterAddress}
            onChange={(e) => setVoterAddress(e.target.value)}
            placeholder="Wallet Address"
            className="border p-2 rounded-lg mr-2"
          />
          <button
            onClick={addVoterHandler}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Address
          </button>
          <button className="mt-2 bg-zinc-700 text-white px-4 py-2 rounded-lg">
            Upload from File
          </button>
        </div>
        <div className="p-4 flex items-center justify-center">
          <button
            type="submit"
            className="mt-2 bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Create New Poll
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
