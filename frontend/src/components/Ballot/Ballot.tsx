import { useContext } from "react";
import { VotingAppContext } from "../../contexts/VotingAppContext";


const undefinedAddress = "0x0000000000000000000000000000000000000000";
import {abi} from "../../artifacts/Poll.json";


const Ballot = () => {

  const {pollAddress, clearPollAddress} = useContext(VotingAppContext);

  return (
    <div className="p-4 m-2 w-full md:max-w-[80rem] bg-white rounded-lg">
      <div className="w-full flex">
      <button
        onClick={clearPollAddress}
        className="p-2 bg-blue-600 text-white rounded-lg"
      >
        Go back
      </button>
      </div>
    {
      (pollAddress === undefinedAddress )?
      <div>
      Poll does not exist
      </div>
      :
    <div>
    This is a ballot of {pollAddress}
  </div>
    }
    </div>
  )
};

export default Ballot;
