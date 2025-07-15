import { Github, Globe2, Linkedin } from "lucide-react";
import React from "react";

function PersonalDetaills({ resumeInfo }) {
  return (
    <div className="">
      <h2 className="font-bold text-[30px] text-center">
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center text-[16px] font-medium">
        {resumeInfo?.jobTitle}
      </h2>
      <h2 className="text-center font-normal text-xs">
        <span className="font-bold text-[14px]"></span>{" "}
        <span className="text-[14px]">  {resumeInfo?.address} </span>
        <br />
        <span className="font-bold text-[14px">
          {resumeInfo?.pincode}
        </span>
      </h2>

      <div className="flex justify-between">
        <h2 className="font-normal text-xs">
          <span className="font-bold text-[14px]"></span> {" "}
          {resumeInfo?.phone}
        </h2>
        <h2 className="font-normal text-xs">
          <span className="font-bold"></span> {resumeInfo?.email}
        </h2>
      </div>
      <div className="flex flex-wrap justify-between mt-2">
        {/* GitHub Link */}
        {resumeInfo?.github && (
          <a
            href={resumeInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs"
          >
            <Github size={16} className="font-extrabold" />
            {resumeInfo.github.slice(0, 20)}...
          </a>
        )}

        {/* LinkedIn Link */}
        {resumeInfo?.linkedin && (
          <a
            href={resumeInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs"
          >
            <Linkedin size={16} className="font-extrabold" />
            {resumeInfo.linkedin.slice(0, 20)}...
          </a>
        )}

        {/* Portfolio Link */}
        {resumeInfo?.portfolio && (
          <a
            href={resumeInfo.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs"
          >
            <Globe2 size={16} className="font-extrabold" />
            {resumeInfo.portfolio.slice(0, 20)}...
          </a>
        )}
      </div>
      <hr />

    </div>
  );
}

export default PersonalDetaills;
