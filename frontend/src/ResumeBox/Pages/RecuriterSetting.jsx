import React, { useState, useEffect } from 'react';
import ProfileEditor from '../Components/ui/ProfileEditor';
import Backend from '@/Api/Recruiter_Api';
import {
  FaFacebook, FaGithub, FaCodepen, FaFigma,
  FaGlobe, FaMedium, FaLinkedin
} from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

function RecuriterSetting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = localStorage.getItem('userid');
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await Backend.Recuriterprofile(userId);
        setProfileData(res.data || {});
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) return <div className="text-center p-10">Loading profile...</div>;

  const demoProfile = {
    firstName: "Your",
    lastName: "Name",
    email: "you@example.com",
    organization: "Your Company",
    designation: "Your Designation",
    aboutMe: "This is your about section. Click edit profile to update this with your personal bio and experience.",
    dateOfBirth: "1990-01-01",
    address: "123 Street, City",
    pincode: "123456",
    location: "Your City",
    hobbies: "Reading, Traveling, Coding",
    linkedin: "",
    facebook: "",
    github: "",
    twitter: "",
    codepen: "",
    figma: "",
    portfolioUrl: "",
    medium: "",
    gender: "",
    mobile: "",
    experience: ""
  };

  const isDemo = !profileData || Object.keys(profileData).length === 0;
  const dataToRender = isDemo ? demoProfile : profileData;

  const {
    firstName, lastName, email, organization, designation,
    aboutMe, dateOfBirth, address, pincode, location,
    hobbies, linkedin, facebook, github, twitter, codepen,
    figma, portfolioUrl, medium, gender, mobile, experience
  } = dataToRender;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-1">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Recruiter Profile</h1>
      {isDemo && (
        <p className="text-sm text-orange-500 italic mb-2">This is a demo profile. Click “Edit Profile” to personalize your data.</p>
      )}

      <div className="max-w-6xl mx-auto min-h-screen overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
              <div className="flex justify-center  sm:justify-center">
                <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-inner">
                  {firstName?.[0]}{lastName?.[0]}
                </div>
              </div>

              <div className="text-center sm:text-left space-y-2 w-full">
                <h2 className="text-2xl font-semibold text-gray-800">{firstName} {lastName}</h2>
                <p className="text-sm text-gray-500">@{email?.split('@')[0]}</p>
                <p className="text-sm text-gray-700">{organization}</p>
                <p className="text-sm text-gray-700">{designation}</p>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-blue-50 rounded-lg px-4 py-2 text-sm text-gray-700 w-full sm:w-auto">
                  {gender || "Not specified"}
                  </div>
                  <div className="bg-green-50 rounded-lg px-4 py-2 text-sm text-gray-700 w-full sm:w-auto">
                    {mobile || "Not provided"}
                  </div>
                  <div className="bg-yellow-50 rounded-lg px-4 py-2 text-sm text-gray-700 w-full sm:w-auto">
                   {experience ? `${experience} years` : "No experience info"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center sm:justify-end">
              <button
                onClick={openModal}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6 sm:col-span-1">
              <h3 className="text-md font-semibold text-gray-800 mb-2">About</h3>
              <p className="text-sm text-gray-500 break-words whitespace-pre-line">
                {aboutMe ? (aboutMe.length > 300 ? `${aboutMe.slice(0, 300)}...` : aboutMe) : "No about info provided."}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 sm:col-span-1">
              <h3 className="text-md font-semibold text-gray-800 mb-2">Personal Details</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><span className="font-medium text-gray-600">Date of Birth:</span> {dateOfBirth?.slice(0, 10)}</p>
                <p><span className="font-medium text-gray-600">Current Address:</span> {address}</p>
                <p><span className="font-medium text-gray-600">Pincode:</span> {pincode}</p>
                <p><span className="font-medium text-gray-600">Location:</span> {location}</p>
                <p><span className="font-medium text-gray-600">Hobbies:</span> {hobbies}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-lg">
            <h3 className="text-md font-semibold text-gray-800 mb-1 w-full">Social Links</h3>
            {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin className="hover:text-blue-700 w-10 h-10 text-gray-600" /></a>}
            {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer"><FaFacebook className="hover:text-blue-600 w-10 h-10 text-gray-600" /></a>}
            {github && <a href={github} target="_blank" rel="noopener noreferrer"><FaGithub className="w-10 h-10 text-gray-600 hover:text-black" /></a>}
            {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer"><RiTwitterXLine className="hover:text-black w-10 h-10 text-gray-600" /></a>}
            {codepen && <a href={codepen} target="_blank" rel="noopener noreferrer"><FaCodepen className="hover:text-black w-10 h-10 text-gray-600" /></a>}
            {figma && <a href={figma} target="_blank" rel="noopener noreferrer"><FaFigma className="hover:text-gray-600 w-10 h-10 text-gray-600" /></a>}
            {portfolioUrl && <a href={portfolioUrl} target="_blank" rel="noopener noreferrer"><FaGlobe className="hover:text-gray-700 w-10 h-10 text-gray-600" /></a>}
            {medium && <a href={medium} target="_blank" rel="noopener noreferrer"><FaMedium className="hover:text-black w-10 h-10 text-gray-600" /></a>}
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50">
          <div className="bg-white rounded-l-lg w-full md:w-[1000px] h-full p-6 overflow-hidden transform transition-transform duration-500 animate-slide-in-right flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button onClick={closeModal} className="hover:text-red-700 hover:bg-red-200 text-gray-800 p-[5px] rounded-full">&times; Close</button>
            </div>
            <ProfileEditor />
          </div>
        </div>
      )}
    </div>
  );
}

export default RecuriterSetting;
