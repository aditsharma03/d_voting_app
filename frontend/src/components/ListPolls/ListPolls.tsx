import { useContext } from "react";
import { VotingAppContext } from "../../contexts/VotingAppContext";
import { Link } from "react-router-dom";

const ListPolls = () => {
  const { myPolls, createNewPoll } = useContext(VotingAppContext);

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

  return (
    <div className="m-2 w-full h-full rounded-lg flex flex-col justify-evenly items-center md:gap-4">
      <div className="  p-2 w-full  bg-violet-500 text-blue-50 rounded-lg flex flex-col sm:flex-row justify-center sm:justify-between items-center">
        <div className="p-2 text-2xl md:text-4xl font-bold">Secure Voting Application</div>
        <div>
          <Link to={"createpoll"}>
          <button
            className="p-2 m-2 bg-indigo-600 border-indigo-700 border-2 font-semibold rounded-lg"
          >
            Create Poll
          </button>
          </Link>
          <button className="p-2 m-2 bg-indigo-600 border-indigo-700 border-2 font-semibold rounded-lg">
            Join Poll
          </button>
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
                  <Link  >
                    <button className="bg-green-400 font-medium px-4 py-2 rounded hover:bg-green-200">
                      View Poll
                      </button>
                  </Link>
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
