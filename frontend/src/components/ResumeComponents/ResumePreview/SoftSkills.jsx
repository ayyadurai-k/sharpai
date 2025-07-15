import React from "react";

function SoftSkills({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2 className="text-start font-bold text-[18px] mb-2">SoftSkills:</h2>
      <hr />

      <div className="grid grid-cols-3 gap-4 my-5">
        {resumeInfo?.softSkills?.map((skill, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <h2 className="text-[16px] font-medium text-black">
              {skill.softSkillName}
            </h2>
      
          </div>
        ))}
      </div>
    </div>
  );
}

export default SoftSkills;
