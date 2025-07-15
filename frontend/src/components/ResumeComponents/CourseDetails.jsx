import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ResumeInformationContext } from "@/context/ResumeContext";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import Backend from "../../Api/ServersideApi";
import { Loader } from "lucide-react";

function CourseDetails({ enabledNext }) {
  const params = useParams();
  const { Resumedata, setResumedata } = useContext(ResumeInformationContext);
  const [loading, setLoading] = useState(false);
  const [coursesList, setCoursesList] = useState([]);
  
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!Resumedata?.courses || Resumedata?.courses.length === 0) {
        try {
          setLoading(false);
          const response = await Backend.GetResumeById(params?.resumeId);
          if (response?.data?.data?.courses) {
            setCoursesList(response?.data?.data?.courses);
            setResumedata((prev) => ({
              ...prev,
              courses: response?.data?.data?.courses,
            }));
          }
        } catch (error) {
          console.error("Error fetching courses data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setCoursesList(Resumedata?.courses);
      }
      enabledNext?.(false);
    };

    fetchCourseData();
  }, [params?.resumeId, setResumedata]);

  useEffect(() => {
    enabledNext(false);
  }, []);

  const handleInputChange = (index, field, value) => {
    enabledNext(false);
    const updatedCourses = [...coursesList];
    if (field === "Professionalskills") {
      updatedCourses[index][field] = value.split(",").map((tag) => tag.trim());
    } else {
      updatedCourses[index][field] = value;
    }
    setCoursesList(updatedCourses);
    setResumedata((prev) => ({ ...prev, courses: updatedCourses }));
  };

  const addNewCourse = () => {
    setCoursesList([
      ...coursesList,
      {
        courseId: coursesList?.length + 1,
        courseName: "",
        institute: "",
        location: "",
        completedDate: "",
        description: "",
        Professionalskills: [],
      },
    ]);
    toast.success("Course Added");
  };

  const removeCourse = () => {
    if (coursesList?.length > 0) {
      setCoursesList(coursesList.slice(0, -1));
      toast.warning("Course Removed");
    }
  };

  useEffect(() => {
    setResumedata((prevData) => ({
      ...prevData,
      courses: coursesList, // Ensure it's correctly updating courses
    }));
  }, [coursesList]);

  const saveCourses = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    const data = {
      resumeId: params?.resumeId,
      courses: coursesList,
    };

    try {
      const response = await Backend.courseDetailsUpdate(data);
      if (response?.data?.status) {
        toast.success("Course details updated successfully!");
        enabledNext(true);
      } else {
        toast.error("Failed to update course details.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-blue-700 mt-10 bg-white">
      <h2 className="font-bold text-lg">Course </h2>
      <p className="text-gray-600">Add your course qualifications</p>

      {loading ? (
        <div className="flex justify-center py-5">
          <Loader className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div>
          {coursesList.map((course, index) => (
            <div key={course.courseId} className="border p-4 my-5 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Course Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter course name (e.g., Full Stack Development)"
                    value={course.courseName}
                    onChange={(e) =>
                      handleInputChange(index, "courseName", e.target.value)
                    }
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                  />
                </div>
 
                {/* Institution Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Institution Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter institution name (e.g., Coursera, Udemy, MIT)"
                    value={course.institute}
                    onChange={(e) =>
                      handleInputChange(index, "institute", e.target.value)
                    }
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter location (e.g., Online, New York, India)"
                    value={course.location}
                    onChange={(e) =>
                      handleInputChange(index, "location", e.target.value)
                    }
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                  />
                </div>

                {/* Completed Date */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Completed Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    autoComplete="off"
                    type="date"
                    value={course.completedDate}
                    onChange={(e) =>
                      handleInputChange(index, "completedDate", e.target.value)
                    }
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                  />
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Professional Skills (comma-separated) <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter relevant tags (e.g., JavaScript, MERN, AI)"
                    // value={course.courseTags.join(", ")}
                    value={course.Professionalskills?.join(", ") || ""}
                    onChange={(e) =>
                      handleInputChange(index, "Professionalskills", e.target.value)
                    }
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    autoComplete="off"
                    placeholder="Briefly describe the course content, skills learned, and key takeaways"
                    value={course.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none mt-1"
                  />
                </div>


                
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mt-5">
        <div className="flex gap-2">
          <button
            onClick={addNewCourse}
            className="px-4 py-2 border rounded-md hover:bg-gray-100   transition"
          >
            + Add More Course
          </button>
          <button
            onClick={removeCourse}
            className="px-4 py-2 border rounded-md  hover:bg-gray-100  transition"
            disabled={coursesList.length === 0}
          >
            - Remove
          </button>
        </div>

        <Button disabled={loading}
         className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
   font-medium shadow-lg hover:from-blue-600 hover:to-blue-800 text-white rounded-md  disabled:opacity-50 flex items-center gap-2"
        
        
        onClick={saveCourses}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default CourseDetails;
