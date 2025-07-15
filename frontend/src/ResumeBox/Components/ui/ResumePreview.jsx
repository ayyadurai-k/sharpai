import React from 'react';
import { Github, Globe2, Linkedin } from 'lucide-react';


const ResumePreview = ({ resume }) => {
    return (
        <div className="relative">
            {/* Resume Content */}
            <div className="shadow-lg h-full ps-10 pe-10 pt-5 border-t-[20px] bg-white text-black">
                <div>
                    <p className="font-normal text-xs text-center">
                        <span className="font-bold text-[14px]"></span> {resume.personalDetails?.firstName} {resume.personalDetails?.lastName}
                    </p>
                    <p className="font-normal text-xs text-center">{resume.personalDetails?.jobTitle}</p>
                    <p className="font-normal text-xs text-center">{resume.personalDetails?.address}</p>

                    <div className="flex justify-between text-xs font-normal mt-2">
                        <p>{resume.personalDetails?.phone}</p>
                        <p className="text-right">{resume.userEmail}</p>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-wrap justify-between mt-2 pb-2">
                        {resume.personalDetails?.github && (
                            <a href={resume.personalDetails.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs">
                                <Github size={16} />
                                {resume.personalDetails.github.slice(0, 20)}...
                            </a>
                        )}
                        {resume.personalDetails?.linkedin && (
                            <a href={resume.personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs">
                                <Linkedin size={16} />
                                {resume.personalDetails.linkedin.slice(0, 20)}...
                            </a>
                        )}
                        {resume.personalDetails?.portfolio && (
                            <a href={resume.personalDetails.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs">
                                <Globe2 size={16} />
                                {resume.personalDetails.portfolio.slice(0, 20)}...
                            </a>
                        )}
                    </div>
                    <hr />
                </div>

                {/* Summary Section */}
                <div className="pt-2 pb-2">
                    <h1 className="font-semibold text-[16px]">Summary:</h1>
                    <p className="text-[12px] text-justify mt-1">
                        {resume.summary || 'No summary available'}
                    </p>
                </div>
                <hr />
                {/* Education Section */}
                <div className="pt-2 pb-2">
                    <h2 className="text-start font-bold text-[16px] pt-1">Education</h2>
               
                    {resume?.education?.map((education, index) => (
                        <div key={index} className="pt-1 pb-1">
                            <h1 className="text-[14px] font-semibold flex justify-between items-center">
                                <span>{education?.degree} - {education?.major}</span>
                                <span>{education?.startDate} - {education?.endDate}</span>
                            </h1>
                            <p className="text-[14px] font-medium">{education?.universityName}</p>
                            <p className="text-[14px]">CGPA: {education?.CCGPA}</p>
                        </div>
                    ))}
                </div>
                <hr />
                {/* Experience Section */}
                <div className="pt-2 pb-2">
                    <h2 className="text-start font-bold text-[16px] pb-1 pt-1">Professional Experience - Internship:</h2>
                   
                    {resume?.experience?.map((experience, index) => (
                        <div key={index} className="pt-2 pb-2">
                            <h2 className="text-[14px] font-semibold flex justify-between">
                                {experience?.experienceTitle}
                                <span>{experience?.startDate} To {experience?.currentlyWorking ? "Present" : experience.endDate}</span>
                            </h2>
                            <h2 className="text-[14px] pt-1">
                                {experience?.companyName} <br />
                                {experience?.city}, {experience?.state}
                            </h2>
                            <div className="text-[12px] my-2 text-justify" dangerouslySetInnerHTML={{ __html: experience?.description }} />
                        </div>
                    ))}
                </div>
                <hr />

                {/* Projects Section */}
                <div className="pb-2 pt-2">
                    <h2 className="text-start font-bold text-[16px] pb-2">Projects:</h2>
                    {resume?.projects?.map((project, index) => (
                        <div key={index} className="pb-1 pt-1">
                            <h2 className="text-[14px] font-semibold flex justify-between">
                                {project?.projectTitle} <span>{project?.duration}</span>
                            </h2>
                            <h2 className="text-[14px]">{project?.companyName}</h2>
                            <p className="text-[12px] my-2 text-justify">{project?.description}</p>
                            <p className="text-[14px] my-2"><span className="font-semibold">Technology:</span> {project?.technology?.join(", ")}</p>
                        </div>
                    ))}
                </div>
                <hr />
                {/* Courses Section */}
                <div className="pt-2 pb-2">
                    <h2 className="text-start font-bold text-[16px] pb-2">Course/Certification:</h2>
                    {resume?.courses?.map((course, index) => (
                        <div key={index} className="pb-1 pt-1">
                            <h1 className="text-[14px] font-semibold flex justify-between items-center">
                                <span>{course?.courseName}</span>
                                <span className="font-bold">{course?.completedDate}</span>
                            </h1>
                            <span className="text-[14px]">{course?.institute}</span> -  
                            <span className="text-[14px]">{course?.location}</span>
                            <p className="text-[14px] pt-1">{course?.description}</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                                {course?.Professionalskills?.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="text-[14px] font-semibold bg-gray-100 px-2 py-1 rounded-md">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                {/* Technical Skills */}
                <div className="pt-2 pb-2">
                    <h2 className="text-start font-bold text-[16px] pb-2">TechnicalSkills:</h2>
                    <div className="grid grid-cols-3 gap-4 pt-1">
                        {resume?.skills?.map((skill, index) => (
                            <div key={index} className="text-[14px] font-medium">{skill.skillName}</div>
                        ))}
                    </div>
                </div>
                <hr />
                {/* Soft Skills */}
                <div className="pt-2 pb-2">
                    <h2 className="text-start font-bold text-[16px] pb-2">SoftSkills:</h2>
                 
                    <div className="grid grid-cols-3 gap-4 pt-1">
                        {resume?.softSkills?.map((skill, index) => (
                            <div key={index} className="text-[14px] font-medium">{skill.softSkillName}</div>
                        ))}
                    </div>
                </div>
                <hr />
                {/* Hobbies */}
                <div className="pb-2 pt-2">
                    <h2 className="text-start font-bold text-[16px] pb-2">Hobbies</h2>
                    <div className="grid grid-cols-3 gap-4 pt-1">
                        {resume?.hobbies?.map((hobby, index) => (
                            <div key={index} className="text-[14px] font-medium">{hobby.hobbieName}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
