
const ListPolls = () => {
  return (
    <div className="m-2 w-full h-full bg-zinc-50 bg-opacity-65 rounded-lg">
      <div className=" m-2 p-2 bg-violet-500 text-blue-50 rounded-lg flex flex-col sm:flex-row justify-center sm:justify-between items-center">
        <div className="p-2 text-2xl font-bold">
          Secure Voting Application
        </div>
        <div>
          <button className="p-2 m-2 bg-indigo-600 border-indigo-700 border-2 font-semibold rounded-lg">Create Poll</button>
          <button className="p-2 m-2 bg-indigo-600 border-indigo-700 border-2 font-semibold rounded-lg">Join Poll</button>
        </div>
      </div>
    </div>
  )
}

export default ListPolls
