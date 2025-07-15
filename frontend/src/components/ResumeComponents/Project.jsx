import React, { useContext, useEffect, useState } from "react";
import { ResumeInformationContext } from "@/context/ResumeContext";
import { Button } from "../ui/button";
import { Info, Loader } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import Backend from "../../Api/ServersideApi";

function Project({ enabledNext }) {
  const params = useParams();
  const { Resumedata, setResumedata } = useContext(ResumeInformationContext);
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState([]);

  // Fetch Projects Data
  useEffect(() => {
    const fetchProjectsData = async () => {
      if (!Resumedata?.projects || Resumedata.projects.length === 0) {
        try {
          setLoading(false);
          const response = await Backend.GetResumeById(params?.resumeId);
          if (response?.data?.data?.projects) {
            setProjectList(response?.data?.data?.projects);
            setResumedata((prev) => ({
              ...prev,
              projects: response?.data?.data?.projects,
            }));
          }
        } catch (error) {
          console.error("Error fetching projects data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setProjectList(Resumedata?.projects);
      }
      enabledNext?.(true);
    };
    fetchProjectsData();
  }, [params?.resumeId]);

  // Handle Input Change
  const handleInputChange = (index, field, value) => {
    enabledNext(false);
    const updatedProjects = [...projectList];
    if (field === "technology") {
      updatedProjects[index][field] = value
        .split(",")
        .map((tech) => tech.trim());
    } else {
      updatedProjects[index][field] = value;
    }
    setProjectList(updatedProjects);
    setResumedata((prev) => ({ ...prev, projects: updatedProjects }));
  };

  // Add a new project
  const addNewProject = () => {
    const newProject = {
      projectId: projectList.length + 1,
      projectTitle: "",
      companyName: "",
      duration: "",
      technology: [],
      description: "",
    };
    const updatedProjects = [...projectList, newProject];
    setProjectList(updatedProjects);
    setResumedata((prev) => ({ ...prev, projects: updatedProjects }));
    toast("Project Added");
  };

  // Remove last project
  const RemoveExperience = (index) => {
    const updatedProjectList = projectList.filter((_, i) => i !== index);
    setProjectList(updatedProjectList);
    toast("Project removed");
  };

  // Save the project list
  const saveProjects = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      resumeId: params?.resumeId,
      projects: projectList,
    };

    try {
      const response = await Backend.projectsDetailsUpdate(data);
      if (response?.data?.status) {
        toast.success("Project details updated successfully!");
        enabledNext(true);
      } else {
        toast.error("Failed to update project details.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-blue-700 mt-10 bg-white">
      <h2 className="font-bold text-lg flex items-center">Projects
      <Info className="w-4 h-4 ms-2 text-gray-500" />
      </h2>
      <p className="text-gray-600">
        Add details about your professional projects
      </p>
      {loading ? (
        <div className="flex justify-center py-5">
          <Loader className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div>
          {projectList.map((item, index) => (
            <div key={item.projectId} className="border p-4 my-5 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Project Title */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    autoComplete="off"
                    type="text"
                    name="projectTitle"
                    placeholder="Enter project title (e.g., AI Resume Builder)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    value={item.projectTitle}
                    onChange={(e) =>
                      handleInputChange(index, "projectTitle", e.target.value)
                    }
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Company Name - College Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Enter company name (or 'Freelance', 'Personal Project')"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    value={item.companyName}
                    onChange={(e) =>
                      handleInputChange(index, "companyName", e.target.value)
                    }
                    required
                    autoComplete="off"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="Enter duration (e.g., 3 months, Jan 2024 - Present)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    value={item.duration}
                    onChange={(e) =>
                      handleInputChange(index, "duration", e.target.value)
                    }
                    required
                    autoComplete="off"
                  />
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Technology (comma separated){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="technology"
                    placeholder="Enter technologies (e.g., React, Node.js, MongoDB)"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    value={item.technology?.join(", ") || ""}
                    onChange={(e) =>
                      handleInputChange(index, "technology", e.target.value)
                    }
                    required
                    autoComplete="off"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Briefly describe the project, objectives, and outcomes"
                    className="w-full h-32 p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    required
                    autoComplete="off"
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
        <Button variant="outline" onClick={addNewProject}>
          + Add More Project
        </Button>
        <Button disabled={loading}
         className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
   font-medium shadow-lg hover:from-blue-600 hover:to-blue-800 text-white rounded-md  disabled:opacity-50 flex items-center gap-2"
        onClick={saveProjects}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Project;
