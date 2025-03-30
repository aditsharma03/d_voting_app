import { useContext, useState } from "react";
import { VotingAppContext } from "../../contexts/VotingAppContext";
import { Link } from "react-router-dom";


  /*
  const data = [
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
    "quick brown fox jumps over the lazy dog",
  ]
  */

const ListPolls = () => {
  const { myPolls, getPollAddress } = useContext(VotingAppContext);


  const [pollId, setPollId] = useState<string>("");

  
  
  const redirectHandler = async () => {
    if (pollId === "") return;

    //validation check here
    getPollAddress(pollId);
    setPollId("");
  };


  return (
    <div className="m-2 w-full h-full rounded-lg flex flex-col justify-evenly items-center md:gap-4">
      <div className="  p-2 w-full  bg-violet-500 text-blue-50 rounded-lg flex flex-col sm:flex-row justify-center sm:justify-between items-center">
        <div className="p-2 text-2xl md:text-4xl font-bold">Secure Voting Application</div>
        <div>
          <span>
            <input 
              type="text"
              placeholder="Poll Id"
              value={pollId}
              onChange={(e) => setPollId(e.target.value)}
              className="p-2 text-black bg-indigo-200 border-b-4 border-indigo-800 rounded-lg"
            />
          <button 
              onClick={redirectHandler}
              className="p-2 m-2 bg-indigo-600 border-indigo-700 border-2 font-semibold rounded-lg"
            >
            Join Poll
          </button>
          </span>
          <Link to={"createpoll"}>
          <button
            className="p-2 m-2 bg-indigo-600 border-indigo-700 border-2 font-semibold rounded-lg"
          >
            Create Poll
          </button>
          </Link>
        </div>
      </div>
        <h2 className="p-4 w-full text-2xl font-semibold text-gray-700 ">
          List of Polls created by you:{" "}
        </h2>
          <table className="w-full bg-white rounded-lg border border-gray-300">
            <thead>
              <tr className="bg-zinc-700 text-white">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Content</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
          </table>
        <div className="w-full max-h-80  md:max-h-[32rem] overflow-scroll  rounded-lg">
          <table className="w-full bg-white rounded-lg border border-gray-300">
            <tbody className="overflow-scroll">
              {myPolls.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-4 py-2">{index+1}</td>
                  <td className="px-4 py-2">{item}</td>
                  <td className="px-4 py-2 text-center">
                    <button onClick={()=>getPollAddress(item)} className="bg-green-400 font-medium px-4 py-2 rounded hover:bg-green-200">
                      View Poll
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default ListPolls;
