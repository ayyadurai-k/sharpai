import { ResumeInformationContext } from "@/context/ResumeContext";
import { GitBranch, Globe, Info, Linkedin, Loader } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Backend from "../../Api/ServersideApi";

const PersonalDetails = ({ enabledNext }) => {
  const params = useParams();
  const { Resumedata, setResumedata } = useContext(ResumeInformationContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: Resumedata?.personalDetails?.firstName || "",
    lastName: Resumedata?.personalDetails?.lastName || "",
    jobTitle: Resumedata?.personalDetails?.jobTitle || "",
    address: Resumedata?.personalDetails?.address || "",
    phone: Resumedata?.personalDetails?.phone || "",
    email: Resumedata?.personalDetails?.email || "",
    pincode: Resumedata?.personalDetails?.pincode || "",
    github: Resumedata?.personalDetails?.github || "",
    linkedin: Resumedata?.personalDetails?.linkedin || "",
    portfolio: Resumedata?.personalDetails?.portfolio || "",
    themeColor: Resumedata?.personalDetails?.themeColor || "#000000",
  });

  useEffect(() => {
    const fetchResumeData = async () => {
      if (Resumedata?.personalDetails) {
        setFormData(Resumedata.personalDetails);
      } else {
        try {
          setLoading(true);
          const response = await Backend.GetResumeById(params?.resumeId);
          if (response?.data?.data?.personalDetails) {
            setResumedata(response.data.data?.personalDetails);
            setFormData(response.data.data?.personalDetails);
          }
        } catch (error) {
          console.error("Error fetching resume data:", error);
        } finally {
          setLoading(false);
        }
      }
      enabledNext?.(false);
    };

    fetchResumeData();
  }, []);

  // Update resumeData context when formData changes
  useEffect(() => {
    if (formData) {
      setResumedata((prev) => ({
        ...prev,
        personalDetails: formData,
      }));
    }
  }, [formData, setResumedata]);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setResumedata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const SavePersonalDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    formData.resumeId = params?.resumeId;
    formData.themeColor = "#000000";
    try {
      const response = await Backend.PersonalDetailsUpdate(formData);
      if (response?.data?.status === true) {
        toast.success("Personal details updated successfully!");
        if (enabledNext) enabledNext(true);
      } else {
        toast.error("Failed to update personal details.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-blue-700 mt-5">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with your basic information</p>
      <form onSubmit={SavePersonalDetails}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              name="firstName"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              value={formData.firstName}
              placeholder="Enter your first name"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              name="lastName"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              value={formData.lastName}
              placeholder="Enter your last name"        
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              name="jobTitle"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              value={formData.jobTitle}
              placeholder="Enter your job title"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              name="address"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              value={formData.address}
              placeholder="Enter your address"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              type="tel"
              name="phone"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              value={formData.phone}
              placeholder="Enter your phone number"
              pattern="\d{10}"
              title="Enter a valid 10-digit phone number"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              name="pincode"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              value={formData.pincode}
              placeholder="Enter your pincode"
              pattern="\d{6}"
              title="Enter a valid 6-digit pincode"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              type="email"
              name="email"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              value={formData.email}
              placeholder="Enter your email address"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* Optional Fields with Icons */}
          <div>
            <label className="text-sm flex items-center gap-1">
              Github <Info className="w-4 h-4 text-gray-500"></Info>
            </label>
            <input
              autoComplete="off"
              type="url"
              name="github"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              value={formData.github}
              placeholder="Enter your GitHub profile URL (optional)"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm flex items-center gap-1">
              LinkedIn <Info className="w-4 h-4 text-gray-500"></Info>
            </label>
            <input
              autoComplete="off"
              type="url"
              name="linkedin"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              value={formData.linkedin}
              placeholder="Enter your LinkedIn profile URL (optional)"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm flex items-center gap-1">
              Portfolio <Info className="w-4 h-4 text-gray-500"></Info>
            </label>
            <input
              autoComplete="off"
              type="url"
              name="portfolio"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              value={formData.portfolio}
              placeholder="Enter your portfolio website URL (optional)"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
   font-medium shadow-lg hover:from-blue-600 hover:to-blue-800 text-white rounded-md  disabled:opacity-50 flex items-center gap-2"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
