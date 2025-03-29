import { useState } from "react";

const CollapsableSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" border-b-4 border-indigo-400 rounded-lg m-4">
      <button
        className="w-full text-left px-4 py-2 font-semibold rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title +"  "} {isOpen ? "▲" : "▼"}
      </button>
      <div className={`p-4 ${ !isOpen && "hidden" } duration-200`}>{children}</div>
      {
        //isOpen && <div className="p-4">{children}</div>
      }
    </div>
  );
};

export default CollapsableSection;
