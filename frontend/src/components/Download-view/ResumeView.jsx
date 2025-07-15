import React, { useState, useEffect, useRef } from "react";
import Header from "../custom/Header";
import { Button } from "../ui/button";
import { RWebShare } from "react-web-share";
import { ResumeInformationContext } from "@/context/ResumeContext";
import { useParams } from "react-router-dom";
import { Download, Share2 } from "lucide-react";
import ResumePreview from "../custom/ResumePreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Backend from "../../Api/ServersideApi";



function ResumeView() {
  const [Resumedata, setResumedata] = useState({});
  const params = useParams();
  const printRef = useRef(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const userResumeData = await Backend.GetResumeById(params?.resumeId);
        if (userResumeData?.data?.data) {
          setResumedata(userResumeData.data.data);
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };

    if (params?.resumeId) {
      fetchResumeData();
    }
  }, [params?.resumeId]);


  const handleDownload = async () => {
    if (!printRef.current) return;
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 1.2 });
    const imgData = canvas.toDataURL("image/png", 0.6);
    console.log(imgData)
    const pdf = new jsPDF("p", "mm", "a4");
    console.log(pdf)
    const imgWidth = 210;
    const imgHeight = 297;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // Get user full name
    let userFullName = "Unknown User";
    if (Resumedata?.personalDetails) {
      const firstName = Resumedata.personalDetails.firstName || "Unknown";
      const lastName = Resumedata.personalDetails.lastName || "User";
      userFullName = `${firstName} ${lastName}`;
    }

    console.log("Storing in localStorage:", userFullName);
    localStorage.setItem("downloadedResumeUser", userFullName);

    pdf.save(`${userFullName.replace(" ", "_")}_Resume.pdf`);

  };


  






  if (!params?.resumeId) {
    return <p className="text-center text-red-500">Invalid Resume ID</p>;
  }

  return (
    <ResumeInformationContext.Provider value={{ Resumedata, setResumedata }}>
      <div id="no-print" className="bg-gray-50 min-h-screen">
        <Header />

        <div className="container mx-auto my-10 px-4 md:px-8">
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            🎉 Congrats! Your AI-Generated Resume is Ready!
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Download your resume now, or share your unique resume URL with others.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <Button
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
              text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 
              active:scale-95 transition-all duration-200"
              onClick={handleDownload}
            >
              <Download size={18} /> Download
            </Button>

            <RWebShare
              data={{
                text: `Hello Everyone, check out my resume here:`,
                url: `${import.meta.env.VITE_BASE_URL ||
                  "https://sharpai.sharpenedmindtechnologies.com"
                  }/my-resume/${params?.resumeId}/view`,
                title: `${Resumedata?.personalDetails?.firstName || "User"} ${Resumedata?.personalDetails?.lastName || ""
                  }'s Resume`,
              }}
              onClick={() => console.log("Resume shared successfully!")}
            >
              <Button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
              text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800">
                <Share2 size={18} /> Share
              </Button>
            </RWebShare>
          </div>
        </div>

        <div className="container mx-auto my-10 px-4">
          <div id="print-area" ref={printRef} className="rounded-lg p-6 md:p-8 max-w-4xl mx-auto">
            <ResumePreview Resumedata={Resumedata} />
          </div>
        </div>
      </div>
    </ResumeInformationContext.Provider>
  );
}

export default ResumeView;
   ;
