import { FileDown, Globe2, Linkedin } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { FiHome, FiLogOut, FiMenu, FiUsers, FiX } from 'react-icons/fi';
import { Link, useLocation, useParams, NavLink, useNavigate } from 'react-router-dom';
import logo from "../../../../assets/mainlogo.png";
import { FaGithub } from 'react-icons/fa';
import html2pdf from "html2pdf.js";

function ResumeDownloadData() {
  const { resumeId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const resumeRef = useRef(); 

  const resume = state?.resume;
  if (!resume) {
    return <div className="text-center mt-8 text-gray-600">Resume not found or not passed correctly.</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin.login");
  };

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0.3,
      filename: `${resume?.personalDetails?.firstName}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white text-black fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-64 transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-between items-center p-4 md:hidden">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="w-28 p-2 sm:w-full md:w-20 lg:w-44 xl:w-18 h-auto" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-black p-2">
            <FiX size={24} />
          </button>
        </div>
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="hidden md:block w-16 p-2 sm:w-24 md:w-20 lg:w-44 xl:w-48 h-auto" />
        </Link>

        <nav className="mt-2 space-y-2">
          <NavLink to="/admin.dashboard" className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-blue-700 transition">
            <FiHome size={24} /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin.dashboard/user" className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-blue-700 transition">
            <FiUsers size={24} /> <span>Users</span>
          </NavLink>
          <NavLink to="/admin.dashboard/user-download" className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-blue-700 transition">
            <FileDown size={24} /> <span>Users Resume</span>
          </NavLink>
          <button onClick={handleLogout} className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-red-700 w-full mt-10">
            <FiLogOut size={24} /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button className="text-blue-900 md:hidden" onClick={() => setSidebarOpen(true)}>
            <FiMenu size={24} />
          </button>
          <h2 className="text-xl font-semibold">User Resume Download</h2>
        </header>

        <main className="p-4 md:p-6 space-y-6">
          {/* Download Button */}
          <div className="flex justify-end">
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>

          {/* Resume Preview */}
          <div ref={resumeRef}>
            <div className="shadow-lg p-12 border-t-[6px] bg-white rounded">
              <div className="text-center space-y-1">
                <h2 className="font-bold text-[30px]">{resume.personalDetails.firstName} {resume.lastName}</h2>
                <h2 className="text-[16px] font-medium">{resume.personalDetails.jobTitle}</h2>
                <p className="text-sm">{resume.personalDetails.address}, {resume.personalDetails.pincode}</p>
                <div className="flex justify-between text-xs mt-2">
                  <span>{resume.personalDetails.phone}</span>
                  <span>{resume.personalDetails.email}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-between mt-4 gap-2 text-xs">
                {resume.personalDetails.github && (
                  <a href={resume.personalDetails.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <FaGithub size={16} /> {resume.personalDetails.github.slice(0, 20)}...
                  </a>
                )}
                {resume.personalDetails.linkedin && (
                  <a href={resume.personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <Linkedin size={16} /> {resume.personalDetails.linkedin.slice(0, 20)}...
                  </a>
                )}
                {resume.personalDetails.portfolio && (
                  <a href={resume.personalDetails.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <Globe2 size={16} /> {resume.personalDetails.portfolio.slice(0, 20)}...
                  </a>
                )}
              </div>

              <h3 className="font-bold text-lg mt-2">Summary</h3>
              <p className="text-sm text-gray-700">{resume.summary}</p>

              <h2 className="text-start font-bold text-[18px] mb-2">Educations:</h2>
              <hr />
              {resume.education.map((education, index) => (
                <div key={index} className="my-3">
                  <h1 className="text-[16px] font-semibold flex justify-between items-center">
                    <span>{education?.degree} - {education?.major}</span>
                    <span>{education?.startDate} - {education?.endDate}</span>
                  </h1>
                  <span className="text-[14px]">{education?.universityName}</span>
                  <br />
                  <span className="text-[14px]">CGPA : {education?.CCGPA}</span>
                </div>
              ))}

              <div className="my-6">
                <h2 className="text-start font-bold text-[18px] mb-2">Professional Experience - Internship:</h2>
                <hr />
                {resume.experience.map((experience, index) => (
                  <div key={index} className="my-5">
                    <h2 className="text-[16px] font-semibold flex justify-between">
                      <span>{experience?.experienceTitle}</span>
                      <span className="font-bold">{experience?.startDate} To {experience?.currentlyWorking ? "Present" : experience?.endDate}</span>
                    </h2>
                    <div className="text-[14px] pt-1">
                      {experience?.companyName}
                      <br />
                      {experience?.city}, {experience?.state}
                    </div>
                    <div
                      className="text-[14px] my-2 text-justify"
                      dangerouslySetInnerHTML={{ __html: experience?.description }}
                    />
                  </div>
                ))}
              </div>

              <div className="my-6">
                <h2 className="text-start font-bold text-[18px] mb-2">Technical Skills:</h2>
                <hr />
                <div className="grid grid-cols-3 gap-4 my-5">
                  {resume?.skills?.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <h2 className="text-[16px] font-medium text-black">{skill?.skillName}</h2>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-6">
                <h2 className="text-start font-bold text-[18px] mb-2">Soft Skills:</h2>
                <hr />
                <div className="grid grid-cols-3 gap-4 my-5">
                  {resume?.softSkills?.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <h2 className="text-[16px] font-medium text-black">{skill?.softSkillName}</h2>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-6">
                <h2 className="text-start font-bold text-[18px] mb-2">Hobbies:</h2>
                <hr />
                <div className="grid grid-cols-3 gap-4 my-5">
                  {resume?.hobbies?.map((hobby, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <h2 className="text-[16px] font-medium text-black">{hobby?.hobbieName}</h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ResumeDownloadData;
