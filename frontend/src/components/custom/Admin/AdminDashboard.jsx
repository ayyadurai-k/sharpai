import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { FaFileAlt, FaUserGraduate, FaUsers, FaUserCheck } from "react-icons/fa";
import Backend from "../../../Api/ServersideApi";
import { Toaster, toast } from "sonner";
import logo from "../../../assets/mainlogo.png";
import axios from "axios";
import { FileDown } from "lucide-react";

const AdminDashboard = () => {
    const [dashboardStats, setDashboardStats] = useState({
        totalResumes: 0,
        totalStudents: 0,
        currentStudents: 0,
        activeToday: 0
    });

    const [userActivities, setUserActivities] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData();
        fetchUserActivities();
    }, []);

    // Fetch Dashboard Stats
    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                toast.error("Unauthorized! Please log in.");
                navigate("/admin/login");
                return;
            }

            const response = await Backend.AdminuserdataDashbaord({
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.data) {
                throw new Error("Invalid dashboard data response");
            }

            setDashboardStats({
                totalResumes: response.data.totalResumes || 0,
                totalStudents: response.data.totalStudents || 0,
                currentStudents: response.data.currentStudents || 0,
                activeToday: response.data.activeToday || 0,
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
        }
    };

    // Fetch User Activities
    const fetchUserActivities = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                toast.error("Unauthorized! Please log in.");
                return;
            }
            const response = await Backend.AdminuserActivities({
                headers: { Authorization: `Bearer ${token}` }
            });


            if (!response.data || typeof response.data !== "object") {
                toast.error("Invalid response format from server.");
                return;
            }
            const { activeUsers, date } = response.data;
            const formattedDate = new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
            setUserActivities(prevActivities => [
                ...prevActivities,
                { date: formattedDate, activeUsers }
            ]);

        } catch (error) {
            console.error("Error fetching user activities:", error);

            const errorMessage = error.response?.data?.message || "Failed to fetch user activities";
            toast.error(errorMessage);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin.login");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`bg-white text-black fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-64 transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4 md:hidden">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="w-28 p-2 sm:w-full md:w-20 lg:w-44 xl:w-18 h-auto" />
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="text-black p-2">
                        <FiX size={24} />
                    </button>
                </div>
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Logo" className="hidden md:block w-16 p-2 sm:w-24 md:w-20 lg:w-44 xl:w-48 h-auto" />
                </Link>

                <nav className="mt-2 space-y-2">
                    <NavLink to="/admin.dashboard" className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-blue-700 transition">
                        <FiHome size={24} /> <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin.dashboard/user" className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-blue-700 transition">
                        <FiUsers size={24} /> <span>Users</span>
                    </NavLink>
                    <NavLink to="/admin.dashboard/user-download" className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-blue-700 transition">
                        <FileDown size={24} /> <span>Users Resume</span>
                    </NavLink>
                    <button onClick={handleLogout} className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-red-700 w-full mt-10">
                        <FiLogOut size={24} /> <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <button className="text-blue-900 md:hidden" onClick={() => setSidebarOpen(true)}>
                        <FiMenu size={24} />
                    </button>
                    <h2 className="text-xl font-semibold">Admin Dashboard</h2>
                </header>

                {/* Page Content */}
                <main className="p-4 md:p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Total Resumes", value: dashboardStats.totalResumes, icon: FaFileAlt, colors: "from-blue-700 to-indigo-800" },
                            { title: "Total Students", value: dashboardStats.totalStudents, icon: FaUserGraduate, colors: "from-green-700 to-teal-800" },
                            { title: "Recent", value: dashboardStats.currentStudents, icon: FaUsers, colors: "from-orange-700 to-yellow-800" },
                            { title: "Active Today", value: dashboardStats.activeToday, icon: FaUserCheck, colors: "from-red-700 to-pink-800" }
                        ].map((stat, index) => (
                            <div key={index} className={`bg-gradient-to-r ${stat.colors} p-6 rounded-xl shadow-lg text-white flex items-center space-x-4`}>
                                <stat.icon className="text-4xl" />
                                <div>
                                    <h3 className="text-lg font-semibold">{stat.title}</h3>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* User Activity Chart */}
                    <div className="bg-white shadow-md rounded-xl p-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-7">User Activity Tracking</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            {userActivities.length > 0 ? (
                                <LineChart data={userActivities}>
                                    <XAxis dataKey="date" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="activeUsers" stroke="#4F46E5" strokeWidth={2} dot={{ r: 5 }} />
                                </LineChart>
                            ) : (
                                <p className="text-gray-500 text-center">No activity data available</p>
                            )}
                        </ResponsiveContainer>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
