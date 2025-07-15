import { ResumeInformationContext } from "@/context/ResumeContext";
import { Info, Loader } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import Backend from "../../Api/ServersideApi";

function Experience({ enabledNext }) {
  const params = useParams();
  const { Resumedata, setResumedata } = useContext(ResumeInformationContext);
  const [loading, setLoading] = useState(false);
  const [experienceList, setExperienceList] = useState(Resumedata?.experience);

  // Fetch Experience Data
  useEffect(() => {
    const fetchExperienceData = async () => {
      if (!Resumedata?.experience || Resumedata?.experience?.length === 0) {
        try {
          setLoading(false);
          const response = await Backend.GetResumeById(params?.resumeId);
          if (response?.data?.data?.experience) {
            setExperienceList(response?.data?.data?.experience);
            setResumedata((prev) => ({
              ...prev,
              experience: response?.data?.data?.experience,
            }));
          }
        } catch (error) {
          console.error("Error fetching experience data:", error);
        } finally {
          setLoading(false);
        }
      }
      enabledNext?.(true);
    };
    fetchExperienceData();
  }, [params?.resumeId]);

  // Handle Form Change
  const handleChange = (index, event) => {
    enabledNext(false);
    const { name, value } = event.target;
    setExperienceList((prev) => {
      const newExperienceList = [...prev];
      newExperienceList[index] = { ...newExperienceList[index], [name]: value };
      return newExperienceList;
    });
  };

  // Update Context when Experience List Changes
  useEffect(() => {
    setResumedata((prev) => ({
      ...prev,
      experience: experienceList,
    }));
  }, [experienceList, setResumedata]);



  // Add New Experience
  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        experienceId: experienceList.length + 1,
        experienceTitle: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ]);
    toast("New Experience Entry Added");
  };

  // Remove Last Experience Entry
  const RemoveExperience = (index) => {
    const updatedExperienceList = experienceList.filter((_, i) => i !== index);
    setExperienceList(updatedExperienceList);
    toast("Experience removed");
  };

  // Save Experience Data to Backend
  const saveExperiences = async (e) => {
    setLoading(true);

    try {
      const response = await Backend.experienceDetailsUpdate({
        resumeId: params?.resumeId,
        experience: experienceList,
      });

      if (response?.data?.status === true) {
        toast.success("Experience details updated successfully!");
        enabledNext?.(true);
      } else {
        toast.error("Failed to update experience details.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-blue-700 mt-10 bg-white">
      <h2 className="font-bold text-lg flex items-center gap-2">
        Professional Experience
        <Info className="w-4 h-4 text-gray-500" />
      </h2>
      <p className="text-gray-600">Add your previous job experience</p>

      {loading ? (
        <div className="flex justify-center py-5">
          <Loader className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div>
          {experienceList.map((item, index) => (
            <div
              key={item?.experienceId}
              className="border p-4 my-5 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Position Title */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Position Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    required
                    type="text"
                    name="experienceTitle"
                    placeholder="Enter your job title (e.g., Software Engineer)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.experienceTitle || ""}
                    pattern="^[a-zA-Z0-9., ]+$"
                    title="Only letters, numbers, dots, and commas allowed."
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    autoComplete="off"
                    type="text"
                    name="companyName"
                    placeholder="Enter company name (e.g., Google Inc.)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.companyName || ""}
                    pattern="^[a-zA-Z0-9., ]+$"
                    title="Only letters, numbers, dots, and commas allowed."
                  />
                </div>

                {/* City */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    autoComplete="off"
                    type="text"
                    name="city"
                    placeholder="Enter city (e.g., San Francisco)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.city || ""}
                    pattern="^[a-zA-Z ]+$"
                    title="Only letters and spaces allowed."
                  />
                </div>

                {/* State */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    autoComplete="off"
                    type="text"
                    name="state"
                    placeholder="Enter state (e.g., NY, CA)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.state || ""}
                    pattern="^[A-Z]{2}$"
                    title="Enter a valid two-letter state code (e.g., NY, CA)."
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    autoComplete="off"
                    type="text"
                    name="startDate"
                    placeholder="Enter start date (e.g., Aug 2018)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.startDate || ""}
                    pattern="^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$"
                    title="Format must be MMM YYYY (e.g., Aug 2018)."
                  />
                </div>

                {/* End Date */}
                {!item?.currentlyWorking && (
                  <div>
                    <label className="text-xs font-semibold text-gray-700">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      name="endDate"
                      placeholder="Enter end date (e.g., Dec 2019)"
                      className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                      onChange={(event) => handleChange(index, event)}
                      value={item?.endDate || ""}
                      pattern="^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$"
                      title="Format must be MMM YYYY (e.g., Dec 2019)."
                    />
                  </div>
                )}

                {/* Currently Working */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Currently Working
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      autoComplete="off"
                      type="checkbox"
                      name="currentlyWorking"
                      className="w-5 h-5"
                      checked={item?.currentlyWorking || false}
                      onChange={(event) => {
                        const newEntries = experienceList.slice();
                        newEntries[index]["currentlyWorking"] =
                          event.target.checked;
                        setExperienceList(newEntries);
                      }}
                    />
                    <span className="text-sm text-gray-600">
                      Currently working here
                    </span>
                  </div>
                </div>

                {/* Job Description */}
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    autoComplete="off"
                    name="description"
                    rows="4"
                    placeholder="Describe your job responsibilities and achievements"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.description || ""}
                    minLength={10}
                    title="Please provide a more detailed job description (at least 10 characters)."
                    required
                  />
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-3"
                onClick={() => RemoveExperience(index)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-5">
        <Button variant="outline" onClick={addNewExperience}>
          + Add More Experience
        </Button>
        <Button disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
   font-medium shadow-lg hover:from-blue-600 hover:to-blue-800 text-white rounded-md  disabled:opacity-50 flex items-center gap-2"

          onClick={saveExperiences}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
