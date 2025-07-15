import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import PersonalDetails from "../ResumeComponents/PersonalDetails";
import Summary from "../ResumeComponents/Summary";
import Experience from "../ResumeComponents/Experience";
import Project from "../ResumeComponents/Project";
import Education from "../ResumeComponents/Education";
import TechnicalSkills from "../ResumeComponents/TechnicalSkills";
import SoftSkills from "../ResumeComponents/SoftSkills";
import CourseDetails from "../ResumeComponents/CourseDetails";
import Hobbies from "../ResumeComponents/Hobbies";
function FormSection() {
  const params = useParams();

  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);


  // Function to render the correct component based on activeFormIndex
  const renderForm = () => {
    switch (activeFormIndex) {
      case 1:
        return <PersonalDetails enabledNext={setEnableNext} />;
      case 2:
        return <Summary enabledNext={setEnableNext} />;
      case 3:
        return <Education enabledNext={setEnableNext} />;
      case 4:
        return <Experience enabledNext={setEnableNext} />;
      case 5:
        return <Project enabledNext={setEnableNext} />;
      case 6:
        return <CourseDetails enabledNext={setEnableNext} />;
      case 7:
        return <TechnicalSkills enabledNext={setEnableNext} />;
      case 8:
        return <SoftSkills enabledNext={setEnableNext} />;
      case 9:
        return <Hobbies enabledNext={setEnableNext} />;
      case 10:
        return <Navigate to={`/my-resume/${params?.resumeId}/view`} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        {/* Home Button */}
        <div className="flex gap-5  bg-gradient-to-r from-blue-500 to-blue-700 
  text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 ">
          <Link to="/newresume">
            <Button >
              <Home />
            </Button>
          </Link>

          {/* <ThemeColor/> */}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button size="sm" className=" bg-gradient-to-r from-blue-500 to-blue-700 
  text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800" onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2  bg-gradient-to-r from-blue-500 to-blue-700 
  text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Render the current form section */}
      {renderForm()}
    </div>
  );
}

export default FormSection;
