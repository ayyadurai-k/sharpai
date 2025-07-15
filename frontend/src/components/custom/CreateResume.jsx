import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResumeInformationContext } from "@/context/ResumeContext";
import FormSection from "./FormSection";
import ResumePreview from "./ResumePreview"; 
import Backend from "../../Api/ServersideApi";


function CreateResume() {
  const { resumeId } = useParams();
  const [Resumedata, setResumedata] = useState(null); 
  
  useEffect(() => {
    if (resumeId) {
      GetResumeInfo();
    }
  }, [resumeId]); 
  
  const GetResumeInfo = async () => {
    try {
      const resp = await Backend.GetResumeById(resumeId);
  
      setResumedata(resp.data.data);
    } catch (error) {
      console.error("Error fetching resume info:", error);
    }
  };
  return (
    <ResumeInformationContext.Provider value={{Resumedata,setResumedata}}>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:p-7 p-10 gap-5 md:gap-10 createresume">
        {/* Form Section  */}
        <FormSection/>
        {/* Preview Section  */}
        <ResumePreview/>


      </div>

    </ResumeInformationContext.Provider>
  );
}

export default CreateResume;
