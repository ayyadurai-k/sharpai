// import { Rating } from "@smastrom/react-rating";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { ResumeInformationContext } from "@/context/ResumeContext";
// import { Input } from "../custom/input";
import "@smastrom/react-rating/style.css"; // Ensure styles are imported
import { toast } from "sonner";
import Backend from "../../Api/ServersideApi";
import { useParams } from "react-router-dom";

function SoftSkills({ enabledNext }) {
  const params = useParams();
  const { Resumedata, setResumedata } = useContext(ResumeInformationContext);
  const [loading, setLoading] = useState(false);
  const [softSkillsList, setSoftSkillsList] = useState([]);

  useEffect(() => {
    const fetchSoftSkillsData = async () => {
      if (!Resumedata?.softSkills || Resumedata.softSkills.length === 0) {
        try {
          setLoading(false);
          const response = await Backend.GetResumeById(params?.resumeId);
          if (response?.data?.data?.softSkills) {
            setSoftSkillsList(response?.data?.data?.softSkills);
            setResumedata((prev) => ({
              ...prev,
              softSkills: response?.data?.data?.softSkills,
            }));
          }
        } catch (error) {
          console.error("Error fetching soft skills data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSoftSkillsList(Resumedata?.softSkills);
      }
      enabledNext?.(false);
    };

    fetchSoftSkillsData();
  }, [params?.resumeId]);

  useEffect(() => {
    if (
      Array.isArray(Resumedata?.softSkills) &&
      Resumedata.softSkills.length > 0
    ) {
      setSoftSkillsList(Resumedata.softSkills);
    }
    enabledNext(false);
  }, []);

  // Handle input change
  const handleSoftSkillChange = (index, field, value) => {
    enabledNext(false);
    const updatedSkills = [...softSkillsList];
    updatedSkills[index][field] = value;
    setSoftSkillsList(updatedSkills);
    setResumedata((prev) => ({ ...prev, softSkills: updatedSkills }));
  };

  // Add new soft skill
  const addNewSoftSkill = () => {
    setSoftSkillsList([
      ...softSkillsList,
      {
        softSkillId: Date.now(), // Use Date.now() for unique ID
        softSkillName: "",
      },
    ]);
    toast.success("Soft Skill Added");
  };

  // Remove last soft skill
  const removeSoftSkill = () => {
    if (softSkillsList.length > 0) {
      setSoftSkillsList(softSkillsList.slice(0, -1));
      toast.warning("Soft Skill Removed");
    }
  };

  // Save soft skills
  const saveSoftSkills = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      resumeId: params?.resumeId,
      softSkills: softSkillsList,
    };

    try {
      const response = await Backend.softSkillsDetailsUpdate(data);
      if (response?.data?.status) {
        toast.success("Soft skills updated successfully!");
        enabledNext(true);
      } else {
        toast.error("Failed to update soft skills.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-blue-700 mt-10 bg-white">
      <h2 className="font-bold text-lg">Soft Skills</h2>
      <p className="text-gray-600">
        Add your key interpersonal and professional skills
      </p>

      {loading ? (
        <div className="flex justify-center py-5">
          <Loader className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div className="mt-4 grid gap-3 grid-cols-2">
          {softSkillsList.map((skill, index) => (
            <div
              key={skill.softSkillId}
              className="grid grid-cols-1 gap-4 items-center p-3"
            >
              <input
                required
                autoComplete="off"
                type="text"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                value={skill.softSkillName}
                onChange={(e) =>
                  handleSoftSkillChange(index, "softSkillName", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-5">
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNewSoftSkill}>
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={removeSoftSkill}
            disabled={softSkillsList?.length === 0}
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} 
        
         className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
   font-medium shadow-lg hover:from-blue-600 hover:to-blue-800 text-white rounded-md  disabled:opacity-50 flex items-center gap-2"
        
        onClick={saveSoftSkills}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default SoftSkills;
