import { ResumeInformationContext } from "@/context/ResumeContext";
import React, { useContext } from "react";
import Summary from "../ResumeComponents/ResumePreview/Summary";
import Experience from "../ResumeComponents/ResumePreview/Experience";
import Project from "../ResumeComponents/ResumePreview/Project";
import PersonalDetaills from "../ResumeComponents/ResumePreview/PersonalDetaills";
import Education from "../ResumeComponents/ResumePreview/Education";
import TechnicalSkills from "../ResumeComponents/ResumePreview/TechnicalSkills";
import SoftSkills from "../ResumeComponents/ResumePreview/SoftSkills";
import CourseDetaills from "../ResumeComponents/ResumePreview/CourseDetaills";
import Hobbies from "../ResumeComponents/ResumePreview/Hobbies";

function ResumePreview() {
  const { Resumedata, setResumedata } = useContext(ResumeInformationContext);

  if (!Resumedata || Object.keys(Resumedata).length === 0) {
    return <p className="text-center text-gray-500">Loading resume data...</p>;
  }
  const isNotEmpty = (data) => {
    if (Array.isArray(data)) return data.length > 0;
    if (typeof data === "object" && data !== null)
      return Object.keys(data).length > 0;
    if (typeof data === "string") return data.trim().length > 0;
    return !!data;
  };

  return (
    <div className="shadow-lg h-full p-10 border-t-[20px]">
      {isNotEmpty(Resumedata?.personalDetails) && (
        <PersonalDetaills resumeInfo={Resumedata?.personalDetails} />
      )}
      {isNotEmpty(Resumedata?.summary) && <Summary resumeInfo={Resumedata} />}

      {isNotEmpty(Resumedata?.education) && (
        <Education resumeInfo={Resumedata?.education} />
      )}

      {isNotEmpty(Resumedata?.experience) && (
        <Experience resumeInfo={Resumedata?.experience} />
      )}

      {isNotEmpty(Resumedata?.projects) && (
        <Project resumeInfo={Resumedata} />
      )}

      {isNotEmpty(Resumedata?.courses) && (
        <CourseDetaills resumeInfo={Resumedata} />
      )}

      {isNotEmpty(Resumedata?.skills) && (
        <TechnicalSkills resumeInfo={Resumedata} />
      )}

      {isNotEmpty(Resumedata?.softSkills) && (
        <SoftSkills resumeInfo={Resumedata} />
      )}

      {isNotEmpty(Resumedata?.hobbies) && (
        <Hobbies resumeInfo={Resumedata} />
        
      )}
    </div>
  );
}

export default ResumePreview;
