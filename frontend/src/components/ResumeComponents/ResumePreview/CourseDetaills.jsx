import React from "react";

function CourseDetaills({ resumeInfo }) {
  return (
    <div className="my-3">
      <h2 className="text-start font-bold text-[18px] mb-2">
        Course/Certification:
      </h2>
      <hr />

      {resumeInfo?.courses?.map((course, index) => (
        <div key={index} className="my-3">
          <h1 className="text-[16px] font-semibold flex justify-between items-center">
            <span>{course?.courseName}</span>
            <span className="font-bold">{course?.completedDate}</span>
          </h1>

          <span className="text-[14px]">{course?.institute}</span>
          <br />
          <span className="text-[14px font-bold">{course?.location}</span>
          <br />
          <p className="text-[14px] pt-1">{course?.description}</p>

          <div className="mt-2 flex flex-wrap gap-1">
            {course?.Professionalskills?.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-[14px] font-bold px-2 py-1 rounded-md text-justify"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseDetaills;
