import { Loader, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Backend from "../../Api/ServersideApi";
import { toast } from "sonner";

function AddResume() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const { user } = useUser();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // Function to open modal and reset input field
  const handleOpen = () => {
    setInputValue(""); // Clear input field when opening
    setIsOpen(true);
  };

  // Function to close modal and reset input field
  const handleClose = () => {
    setIsOpen(false);
    setInputValue(""); // Clear input when closing
  };

  const handleClick = async () => {
    if (!inputValue.trim()) return;

    const uuid = uuidv4();
    setloading(true);

    const data = {
      resumeId: uuid,
      resumeTitle: inputValue.trim(),
      userEmail: user?.primaryEmailAddress?.emailAddress || "",
      userName: user?.fullName || "",
    };



    try {
      const resp = await Backend.CreateNewResume(data);

      const resumeId = resp?.data?.data?.resumeId;
      if (resumeId) {
        toast.success("Resume Created Successfully!");
        navigate(`/newresume/resume/${resumeId}/edit`);
      } else {
        throw new Error("Resume ID not found in response.");
      }
    } catch (error) {
      toast.error("Failed to create resume! Please try again.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border 
         items-center flex 
        justify-center bg-secondary
        rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed"
        onClick={handleOpen}
      >
        <PlusSquare />
      </div>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold">Create New Resume</h2>
            <p className="text-gray-600 text-sm mt-2">
              Add a title for your new resume
            </p>

            {/* Input Field */}
            <input
              type="text"
              className="mt-2 w-full border rounded-md p-2 focus:outline-none"
              placeholder="Ex. Full Stack Resume"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-5">
              {/* Cancel Button */}
              <Button
                onClick={handleClose}
                className="px-4 sm:px-5 md:px-6 lg:px-8 py-2 text-sm md:text-base font-semibold rounded-lg 
                transition-all shadow-md bg-[#db1818] text-white border border-[#db1818]
                hover:border-[#db1818] hover:bg-[#db1818]"
              >
                Cancel
              </Button>

              {/* Create Button */}
              <Button
                className="px-4 sm:px-5 md:px-6 lg:px-8 py-2 text-sm md:text-base font-semibold rounded-lg 
                transition-all shadow-md bg-[#0d6efd] text-white border border-[#0d6efd]
                hover:bg-[#0d6efd] hover:border-[#0d6efd]"
                onClick={handleClick}
                disabled={!inputValue.trim() || loading}
              >
                {loading ? <Loader className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddResume;
