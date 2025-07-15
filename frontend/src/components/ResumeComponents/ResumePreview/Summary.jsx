import React from "react";

function Summary({ resumeInfo }) {
  return (
    <div>
      <span className="pb-2 font-bold text-[18px] mb-2">
        Careers Objective:
      </span>
      <p className="text-[15px] text-justify mt-1">{resumeInfo?.summary}</p>
    </div>
  );
}

export default Summary;
