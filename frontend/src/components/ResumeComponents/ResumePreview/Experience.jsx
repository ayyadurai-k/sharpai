import React from "react";

function Experience({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2 className="text-start font-bold text-[18px] mb-2">
        Professional Experience - Internship: 
      </h2>
      <hr />

      {resumeInfo?.map((experience, index) => (
        <div key={index} className="my-5">
          <h2 className="text-[16px] font-semibold flex justify-between">
            {experience?.experienceTitle}
            <span className="font-bold">
              {experience?.startDate} To{" "}
              {experience?.currentlyWorking ? "Present" : experience.endDate}{" "}
            </span>
          </h2>
          <h2 className="text-[14px] flex justify-between pt-1">
            {experience?.companyName}
            <br />
            {experience?.city}
            <br />
            {experience?.state}
          </h2>

          <div
            className="text-[14px] my-2 text-justify"
            dangerouslySetInnerHTML={{ __html: experience?.description }}
          />
        </div>
      ))}
    </div>
  );
}

export default Experience;
