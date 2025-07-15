import axios from "axios";

// Live URL
const BACKEND_ASEURL =
  import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKENDLOCAL_URL;

// Create Axios Instance
const axiosClient = axios.create({
  baseURL: BACKEND_ASEURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

// ✅ Interceptor: Add Bearer Token Only for Admin Routes
axiosClient.interceptors.request.use(
  (config) => {
    if (config.url.startsWith("api/admin/")) {
      const token = localStorage.getItem("adminToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ ECONNABORTED Error Handling Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ECONNABORTED") {
      console.warn("Request timed out. Retrying...");
      return axiosClient.request(error.config);
    }
    return Promise.reject(error);
  }
);

// ✅ Resume API Calls (No Bearer Token)
const CreateNewResume = (data) =>
  axiosClient.post("api/resume/createdTitle", data);
const GetResumeById = (id) =>
  axiosClient.get(`api/resume/singleGetResume?resumeId=${id}`);
const GetUserResumes = (userEmail) =>
  axiosClient.get(
    `api/resume/getall-filters?userEmail=${userEmail}&page=1&limit=10`
  );
const DeleteResumeById = (id) => axiosClient.delete("api/resume/delete/" + id);
const PersonalDetailsUpdate = (data) =>
  axiosClient.post("api/resume/addPersonalDetails", data);
const sumamaryDetailsUpdate = (data) =>
  axiosClient.post("api/resume/addSummary", data);
const educationDetailsUpdate = (data) =>
  axiosClient.post("api/resume/addEducation", data);
const experienceDetailsUpdate = (data) =>
  axiosClient.post("api/resume/addExperience", data);
const projectsDetailsUpdate = (data) =>
  axiosClient.post("api/resume/addProjectDetails", data);
const skillsDetailsUpdate = (data) =>
  axiosClient.post("api/resume/addSkills", data);
const softSkillsDetailsUpdate = (data) =>
  axiosClient.post("api/resume/addSoftSkills", data);
const HobbiesDetailsUpdate = (data) =>
  axiosClient.post("api/resume/addHobbies", data);
const courseDetailsUpdate = (data) =>
  axiosClient.post("api/resume/addCourse", data);
 const UserDownloadResume = (data) => axiosClient.post("api/resume/save",data);

//  DreamBox ApI
const dreamboxfromdata = (data)=> axiosClient.post("api/dreams/savedream",data);
const GetAllDreamData = (data) =>axiosClient.get("api/dreams/alldream",data)
const GetDreamByID =(roadmapId) => axiosClient.get(`api/dreams/getdream/${roadmapId}`)
const DeleteDreamById = (roadmapId) =>axiosClient.delete(`api/dreams/deletedream/${roadmapId}`)


// ✅ Admin API Calls (Bearer Token Applied Automatically)
const AdminLogincredentials = (data) =>
  axiosClient.post("api/admin/login", data);
const AdminRegisterCredentials = (data) =>
  axiosClient.post("api/admin/register", data);
const AdminuserdataDashbaord = () => axiosClient.get("api/admin/dashboard");
const AdminUserDatalist = () => axiosClient.get("api/admin/userlist");
const AdminusersearchQuery = (query) =>
  axiosClient.get(`api/admin/search/?query=${query}`);
const AdminuserActivities = () => axiosClient.get("api/admin/useractivites");
const AdminUserResuemDownload =()=> axiosClient.get('api/admin/userresume-download')






// ✅ Export All API Functions
export default {
  CreateNewResume,
  DeleteResumeById,
  GetUserResumes,
  GetResumeById,
  PersonalDetailsUpdate,
  sumamaryDetailsUpdate,
  educationDetailsUpdate,
  experienceDetailsUpdate,
  projectsDetailsUpdate,
  skillsDetailsUpdate,
  softSkillsDetailsUpdate,
  courseDetailsUpdate,
  HobbiesDetailsUpdate,
  AdminLogincredentials,
  AdminRegisterCredentials,
  AdminuserdataDashbaord,
  AdminUserDatalist,
  AdminusersearchQuery,
  AdminUserResuemDownload,
  AdminuserActivities,
  UserDownloadResume,
  dreamboxfromdata,
  GetAllDreamData,
  DeleteDreamById,
  GetDreamByID,
 
};
