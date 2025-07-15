import { Rating } from "@smastrom/react-rating";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader, LoaderCircle } from "lucide-react";
import { ResumeInformationContext } from "@/context/ResumeContext";
import { Input } from "../custom/input";
import "@smastrom/react-rating/style.css";
import { toast } from "sonner";
import Backend from "../../Api/ServersideApi";
import { useParams } from "react-router-dom";

function TechnicalSkills({ enabledNext }) {
  const params = useParams();
  const { Resumedata, setResumedata } = useContext(ResumeInformationContext);
  const [loading, setloading] = useState(false);
  const [skillsList, setSkillsList] = useState([
    {
      skillName: "",
    },
  ]);

  useEffect(() => {
    const fetchSkillsData = async () => {
      if (!Resumedata?.skills || Resumedata.skills.length === 0) {
        try {
          setloading(false);
          const response = await Backend.GetResumeById(params?.resumeId);
          if (response?.data?.data?.skills) {
            setSkillsList(response?.data?.data?.skills);
            setResumedata((prev) => ({
              ...prev,
              skills: response?.data?.data?.skills,
            }));
          }
        } catch (error) {
          console.error("Error fetching projects data:", error);
        } finally {
          setloading(false);
        }
      } else {
        setSkillsList(Resumedata?.skills);
      }
      enabledNext?.(false);
    };

    fetchSkillsData();
  }, [params?.resumeId]);

  // data fecth data json
  useEffect(() => {
    Resumedata && setSkillsList(Resumedata?.skills);
    enabledNext(false);
  }, []);

  // handlechanged fundtion

  const handleChange = (index, name, value) => {
    enabledNext(false);
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        skillId: skillsList?.length + 1,
        skillName: "",
        // rating: 0,
      },
    ]);
    toast("Skills Added");
  };
  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
    toast("Skills Removed");
  };

  const SavedSkills = async (e) => {
    e.preventDefault();
    setloading(true);
    const data = {
      resumeId: params?.resumeId,
      skills: skillsList,
    };
    try {
      const response = await Backend.skillsDetailsUpdate(data);
      if (response?.data?.status) {
        toast.success("Skills details updated successfully!");
        enabledNext(true);
      } else {
        toast.error("Skills to update project details.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    setResumedata({
      ...Resumedata,
      skills: skillsList,
    });
  }, [skillsList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-blue-700 mt-10 bg-white">
      <h2 className="font-bold text-lg">Technical Skills</h2>
      <p className="text-gray-600">Add your top professional key skills</p>
      {loading ? (
        <div className="flex justify-center py-5">
          <Loader className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div className="mt-4 grid gap-3 grid-cols-2">
          {skillsList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-1 gap-4 items-center   p-3"
            >
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                defaultValue={item.skillName}
                onChange={(e) =>
                  handleChange(index, "skillName", e.target.value)
                }
                required
                autoComplete="off"
              />
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-5">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewSkills}>
            + Add More Skills
          </Button>

          <Button
            variant="outline"
            onClick={RemoveSkills}
            disabled={skillsList?.length === 0}
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading}
         className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
   font-medium shadow-lg hover:from-blue-600 hover:to-blue-800 text-white rounded-md  disabled:opacity-50 flex items-center gap-2"
        
        
        onClick={SavedSkills}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default TechnicalSkills;
