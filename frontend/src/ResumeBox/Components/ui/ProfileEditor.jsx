import { useState } from "react";
import {
    FaUser, FaFileAlt, FaInfoCircle, FaTools, FaGraduationCap,
    FaBriefcase, FaAddressCard, FaLink
} from 'react-icons/fa';
import BasicDetails from "./BasicDetails";
import About from "./About";
import PersonalDetails from "./PersonalDetails";
import SocialMedia from "./SocialMedia";


export default function ProfileEditor() {
    const [activeSection, setActiveSection] = useState("Basic Details");

    const sections = [
        { label: "Basic Details", icon: <FaUser /> },
        { label: "About Me", icon: <FaInfoCircle /> },
        { label: "Personal Details", icon: <FaAddressCard /> },
        { label: "Social Links", icon: <FaLink /> },
    ];



    const renderFormSection = () => {
        switch (activeSection) {
            case "Basic Details":
                return (
                    <BasicDetails />
                );
            case "About Me":
                return (
                    <About />
                );
            case "Personal Details":
                return (
                    <PersonalDetails />
                )
            case "Social Links":
                return (
                    <SocialMedia />
                )

        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2  bg-slate-50 rounded h-full">
            {/* Left Column - Navigation */}
            <div className="md:col-span-4 space-y-3  p-4 border-r-2">
                {sections.map(({ label, icon }) => (
                    <div
                        key={label}
                        onClick={() => setActiveSection(label)}
                        className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg shadow font-semibold ${activeSection === label ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                            }`}
                    >
                        <span className="text-lg">{icon}</span>
                        <span>{label}</span>
                    </div>
                ))}
            </div>



            {/* Right Column - Form Panel */}
            <div className="md:col-span-8 overflow-y-auto max-h-[80vh] custom-scroll p-1">
                {renderFormSection()}


            </div>
        </div>
    );
}
