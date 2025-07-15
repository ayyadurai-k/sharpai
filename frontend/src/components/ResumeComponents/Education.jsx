import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {  Loader } from "lucide-react";
import { ResumeInformationContext } from "@/context/ResumeContext";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import Backend from "../../Api/ServersideApi";

function Education({ enabledNext }) {
  const params = useParams();
  const { Resumedata, setResumedata } = useContext(ResumeInformationContext);
  const [loading, setLoading] = useState(false);
  const [educationList, setEducationList] = useState(Resumedata?.education);

  // ✅ Fetch Education Data when component mounts
  useEffect(() => {
    const fetchEducationData = async () => {
      if (!Resumedata?.education || Resumedata?.education?.length === 0) {
        try {
          setLoading(false);
          const response = await Backend.GetResumeById(params?.resumeId);
          if (response?.data?.data?.education) {
            setEducationList(response?.data?.data?.education);
            setResumedata((prev) => ({
              ...prev,
              education: response?.data?.data?.education,
            }));
          }
        } catch (error) {
          console.error("Error fetching education data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setEducationList(Resumedata?.education);
      }
    };
    enabledNext?.(false);
    fetchEducationData();
  }, []);

  // ✅ Update Context when Education List Changes
  useEffect(() => {
    setResumedata((prev) => ({
      ...prev,
      education: educationList,
    }));
  }, [educationList, setResumedata]);

  // ✅ Handle Input Change
  const handleInputChange = (index, field, value) => {
    const updatedEducationList = educationList.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducationList(updatedEducationList);
  };

  // ✅ Add New Education Entry
  const addEducation = () => {
    setEducationList([
      ...educationList,
      {
        educationId: educationList.length + 1,
        universityName: "",
        degree: "",
        CCGPA: "",
        major: "",
        startDate: "",
        endDate: "",
      },
    ]);
    toast("New Education Entry Added");
  };

  // ✅ Remove Education Entry
  const removeEducation = (index) => {
    const updatedEducationList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedEducationList);
    toast("Education Entry Removed");
  };

  // ✅ Save Education Data
  const saveEducation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Backend.educationDetailsUpdate({
        resumeId: params?.resumeId,
        education: educationList,
      });

      if (response?.data?.status === true) {
        toast.success("Education details updated successfully!");
        enabledNext?.(true);
      } else {
        toast.error("Failed to update Education details.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-blue-700 mt-10 bg-white">
      <h2 className="font-bold text-lg ">Education

      </h2>
      <p className="text-gray-600">Add your educational qualifications</p>

      {loading ? (
        <div className="flex justify-center py-5">
          <Loader className="animate-spin text-blue-700" size={30} />
        </div>
      ) : (
        <>
          {educationList?.map((edu, index) => (
            <div key={index} className="border p-4 my-5 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Degree - School <span className="text-red-500">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="degree"
                    placeholder="Enter Degree (e.g., B.Sc, B.Tech, Master)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    value={edu.degree || ""}
                    onChange={(e) =>
                      handleInputChange(index, "degree", e.target.value)
                    }
                    pattern="^[a-zA-Z0-9., ]+$"
                    title="Only letters, numbers, dots, and commas allowed."
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Major - Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="major"
                    placeholder="Enter Major (e.g., Computer Science)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    value={edu.major || ""}
                    onChange={(e) =>
                      handleInputChange(index, "major", e.target.value)
                    }
                    pattern="^[a-zA-Z ]+$"
                    title="Only letters and spaces allowed."
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    University Name - College Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="universityName"
                    placeholder="Enter University Name"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    value={edu.universityName || ""}
                    onChange={(e) =>
                      handleInputChange(index, "universityName", e.target.value)
                    }
                    pattern="^[a-zA-Z ]+$"
                    title="Only letters and spaces allowed."
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="startDate"
                    placeholder="Enter Start Date (e.g., Aug 2018)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    value={edu.startDate || ""}
                    onChange={(e) =>
                      handleInputChange(index, "startDate", e.target.value)
                    }
                    pattern="^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$"
                    title="Format must be MMM YYYY (e.g., Aug 2018)."
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="endDate"
                    placeholder="Enter End Date (e.g., Dec 2019)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    value={edu.endDate || ""}
                    onChange={(e) =>
                      handleInputChange(index, "endDate", e.target.value)
                    }
                    pattern="^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$"
                    title="Format must be MMM YYYY (e.g., Dec 2019)."
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    CGPA - Percentage <span className="text-red-500">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="CCGPA"
                    placeholder="Enter CGPA or Percentage (e.g., 8.5 or 85)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    value={edu.CCGPA || ""}
                    onChange={(e) =>
                      handleInputChange(index, "CCGPA", e.target.value)
                    }
                    pattern="^\d+(\.\d{1,2})?$"
                    title="Only numbers allowed (with up to 2 decimal places)."
                    required
                  />
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-3"
                onClick={() => removeEducation(index)}
              >
                Remove
              </Button>
            </div>
          ))}

          <div className="flex justify-between mt-5">
            <Button variant="outline" onClick={addEducation}>
              + Add More Education
            </Button>
            <Button disabled={loading}
             className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
   font-medium shadow-lg hover:from-blue-600 hover:to-blue-800 text-white rounded-md  disabled:opacity-50 flex items-center gap-2"
            onClick={saveEducation}>
              {loading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Education;
