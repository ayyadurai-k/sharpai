import React from "react";

function TechnicalSkills({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-start font-bold text-[18px] mb-2"
      >
        TechnicalSkills:
      </h2>
      <hr
    
      />

      <div className="grid grid-cols-3 gap-4 my-3">
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <h2 className="text-[16px] font-medium text-black">{skill.skillName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnicalSkills;
