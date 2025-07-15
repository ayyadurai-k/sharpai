import React from "react";

function Education({ resumeInfo }) {
  return (
    <div className="my-3">
      <h2
        className="text-start font-bold text-[18px] mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Educations:
      </h2>

      <hr />
      {resumeInfo?.map((education, index) => (
        <div key={index} className="my-3">
          <h2 className="text-sm font-bold"></h2>
          <h1 className="text-[16px] font-semibold flex justify-between items-center">
            <span>
              {education?.degree} - {education?.major}
            </span>
            <span>
              {education?.startDate} - {education?.endDate}
            </span>
          </h1>

          <span className="text=[14px]">{education?.universityName}</span>
          <br />
          <span className="text-[14px] ">CGPA : {education?.CCGPA}</span>

          <br />
          {/* <span className='text-[14px] '>{education?.description}</span> */}
          <br />
        </div>
      ))}
    </div>
  );
}

export default Education;
