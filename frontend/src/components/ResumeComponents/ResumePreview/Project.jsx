import React from "react";

function Project({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2 className="text-start font-bold text-[18px] mb-2">Projects:</h2>
      <hr style={{ borderColor: resumeInfo?.personalDetails.themeColor }} />

      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-[16px] font-semibold flex justify-between"
            style={{ color: resumeInfo?.themeColor }}
          >
            {project?.projectTitle} <span>{project?.duration}</span>
          </h2>
          <h2 className="text-[14px] ">{project?.companyName}</h2>

          <p className="text-[14px]  my-2 text-justify">
            {project?.description}
          </p>

          <p className="text-[14px] my-2">
            <span className="font-semibold">Technology:</span>{" "}
            {project?.technology?.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Project;
