import React, { useEffect, useState } from "react";
import AddResume from "./AddResume";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItems from "./ResumeCardItems";
import Backend from "../../Api/ServersideApi";


function Dashboard() {
  const { user } = useUser();
  const [resumeData, setResumeData] = useState([]);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = () => {
    Backend.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        setResumeData(resp.data.data);
      })
      .catch((error) => {
        console.error("Error fetching resumes:", error);
      });
  };

  return (
    <>
      <div className="p-10  md:px-20 lg:px-32 ">
        <h2 className="font-bold text-3xl">My Resume</h2>
        <p>Start Creating AI resume for your next Job role</p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 mt-6 sm:mt-10"
        >
          <AddResume />
          {resumeData.length > 0 ? (
            resumeData.map((resume, index) => (
              <ResumeCardItems resume={resume} key={index} refreshData={GetResumesList} />
            ))
          ) : (
            [].map((item, index) => (
              <div key={index} className="h-[200px] sm:h-[280px] rounded-lg  bg-secondary animate-pulse"></div>
            ))
          )}

        </div>

      </div>
    </>

  );
}

export default Dashboard;
