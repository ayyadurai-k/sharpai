import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { ResumeInformationContext } from "@/context/ResumeContext";
import { toast } from "sonner";
import Backend from "../../Api/ServersideApi";
import { useNavigate, useParams } from "react-router-dom";

function Hobbies({ enabledNext }) {
  const params = useParams();
  const { Resumedata, setResumedata } = useContext(ResumeInformationContext);
  const [loading, setLoading] = useState(false);
  const [hobbiesList, setHobbiesList] = useState([
    {
      hobbyName: "",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHobbiesData = async () => {
      if (!Resumedata?.hobbies || Resumedata.hobbies.length === 0) {
        try {
          setLoading(true);
          const response = await Backend.GetResumeById(params?.resumeId);
          if (response?.data?.data?.hobbies) {
            setHobbiesList(response?.data?.data?.hobbies);
            setResumedata((prev) => ({
              ...prev,
              hobbies: response?.data?.data?.hobbies,
            }));
          }
        } catch (error) {
          console.error("Error fetching hobbies data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setHobbiesList(Resumedata?.hobbies);
      }
    };

    fetchHobbiesData();
  }, [params?.resumeId]);

  useEffect(() => {
    Resumedata && setHobbiesList(Resumedata?.hobbies);
  }, []);

  const handleHobbyChange = (index, name, value) => {
    enabledNext(false);
    const newEntries = hobbiesList.slice();
    newEntries[index][name] = value;
    setHobbiesList(newEntries);
  };

  const addNewHobby = () => {
    setHobbiesList([
      ...hobbiesList,
      {
        hobbieId: hobbiesList?.length + 1,
        hobbieName: "",
      },
    ]);
    toast("Hobby Added");
  };

  const removeHobby = () => {
    setHobbiesList((hobbiesList) => hobbiesList.slice(0, -1));
    toast("Hobby Removed");
  };

  const saveHobbies = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      resumeId: params?.resumeId,
      hobbies: hobbiesList,
    };
   
    try {
      const response = await Backend.HobbiesDetailsUpdate(data);
     

      if (response?.data?.status) {
        toast.success("Hobbies details updated successfully!");
       

        // Ensure resumeId is valid before navigating
        if (params?.resumeId) {
          navigate(`/my-resume/${params?.resumeId}/view`);
        } else {
          toast.error("Invalid resume ID. Cannot navigate.");
        }
      } else {
        toast.error("Failed to update hobbies details.");
      }
    } catch (error) {
      console.error("Error updating hobbies:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResumedata({
      ...Resumedata,
      hobbies: hobbiesList,
    });
  }, [hobbiesList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-blue-700 mt-10 bg-white">
      <h2 className="font-bold text-lg">Hobbies</h2>
      <p className="text-gray-600">Add your favorite hobbies and interests</p>
      {loading ? (
        <div className="flex justify-center py-5">
          <Loader className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div className="mt-4 grid gap-3 grid-cols-2">
          {hobbiesList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-1 gap-4 items-center p-3"
            >
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                defaultValue={item.hobbieName}
                onChange={(e) =>
                  handleHobbyChange(index, "hobbieName", e.target.value)
                }
                required
                autoComplete="off"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-5">
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNewHobby}>
            + Add More Hobbies
          </Button>

          <Button
            variant="outline"
            onClick={removeHobby}
            disabled={hobbiesList?.length === 0}
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading}
         className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
   font-medium shadow-lg hover:from-blue-600 hover:to-blue-800 text-white rounded-md  disabled:opacity-50 flex items-center gap-2"
        
        onClick={saveHobbies}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Hobbies;
