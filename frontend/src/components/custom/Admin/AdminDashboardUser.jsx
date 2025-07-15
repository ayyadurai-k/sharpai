import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FileDown, Search } from "lucide-react";
import { FiHome, FiUsers, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import logo from "../../../assets/mainlogo.png";
import UserTableData from "./Admin Components/UserTableData";
import Backend from "../../../Api/ServersideApi"; // Import API functions
import SearchQueryData from "./Admin Components/SearchQueryData";

function AdminDashboardUser() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("adminToken");
        navigate("/admin.login");
    }

    // Fetch users based on search query
    useEffect(() => {
        const fetchUsers = async () => {
            if (!searchQuery) {
                setUsers([]);
                return;
            }

            setLoading(true);
            try {
                const response = await Backend.AdminusersearchQuery(searchQuery);
                setUsers(response.data || []);
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]);
            }
            setLoading(false);
        };

        const delayDebounce = setTimeout(fetchUsers, 500); // Debounce API call

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`bg-white fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-64 transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4 md:hidden">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="w-28 p-2 sm:w-full md:w-20 lg:w-44 h-auto" />
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="text-black p-2">
                        <FiX size={24} />
                    </button>
                </div>
                <Link to="/" className="hidden md:block">
                    <img src={logo} alt="Logo" className="w-16 p-2 sm:w-24 md:w-20 lg:w-44 h-auto" />
                </Link>
                <nav className="mt-2 space-y-2">
                    <NavLink to="/admin.dashboard" className="flex items-center space-x-3 p-4 rounded-lg hover:bg-blue-700 hover:text-white transition">
                        <FiHome size={24} /><span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin.dashboard/user" className="flex items-center space-x-3 p-4 rounded-lg hover:bg-blue-700 hover:text-white transition">
                        <FiUsers size={24} /><span>Users</span>
                    </NavLink>
                    <NavLink to="/admin.dashboard/user-download" className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-blue-700 transition">
                        <FileDown size={24} /> <span>Users Resume </span>
                    </NavLink>
                    <button onClick={handleLogout} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-red-700 hover:text-white w-full mt-10">
                        <FiLogOut size={24} /><span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <button className="text-blue-900 md:hidden" onClick={() => setSidebarOpen(true)}>
                        <FiMenu size={24} />
                    </button>
                    <h2 className="text-xl font-semibold">User Dashboard</h2>
                </header>
                <main className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mx-auto p-4">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-64 md:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-full "
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Loading Indicator */}
                    {loading && <p className="text-center text-gray-500">Loading...</p>}

                    {/* Conditionally render UserTableData or SearchQueryData */}
                    {users.length > 0 ? <SearchQueryData QueryData={users} /> : <UserTableData />}
                </main>
            </div>
        </div>
    );
}

export default AdminDashboardUser;
