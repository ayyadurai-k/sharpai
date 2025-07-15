import React, { useEffect, useState } from 'react';
import Header from '@/components/custom/Header';
import { Menu, X, PlusCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import DreamboxDisplay from './DreamboxDisplay';
import DreamBoxPreviousDream from './DreamBoxPreviousDream';
import Backend from "../Api/ServersideApi"

function DreamDashboard() {
 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [dreamData, setDreamData] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        let isMounted = true;
        const fetchDream = async () => {
            setLoading(true);
            setDreamData(null); 
            try {
                const { status, data } = await Backend.GetDreamByID(id);
                if (isMounted) {
                    if (status === 200 && data) {
                        setDreamData(data);
                    } else {
                        navigate("/dreambox-form", { replace: true });
                    }
                }
            } catch (err) {
                console.error("Error fetching dream:", err);
                if (isMounted) {
                    navigate("/dreambox-form", { replace: true });
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (id) fetchDream();

        return () => { isMounted = false };
    }, [id, navigate]);

    const handleDreamDeleted = (deletedId) => {
        if (deletedId === id) {
            setDreamData(null);
            navigate('/dreambox-form', { replace: true });        }
    };


    return (
        <>
            <div className="sticky top-0 z-50 bg-white shadow">
                <Header />
            </div>
            <section>
                <div className="relative overflow-hidden">
                    <section className="bg-white min-h-screen flex pb-2">
                        {/* Mobile Toggle Button */}
                        <button
                            className={`fixed top-14 md:hidden p-3 rounded-full transition-all duration-7000
                            ${isSidebarOpen ? 'left-64' : 'left-4'}
                            bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500
                            shadow-xl shadow-pink-500/50
                            animate-pulse
                            text-white`}
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        {/* Layout */}
                        <div className="flex w-full">
                            {/* Sidebar */}
                            <aside
                                className={`bg-slate-50 transition-transform duration-300 p-4 w-64 fixed md:relative h-full z-40 
                                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
                            >
                                <button
                                    className="w-full text-left bg-gray-100 hover:bg-gray-200 p-2 rounded-md mb-4 flex items-center gap-2"
                                    onClick={() => navigate("/dreambox-form")}
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    New Chart
                                </button>
                                <DreamBoxPreviousDream onDreamDeleted={handleDreamDeleted} />
                            </aside>

                            {/* Main Content */}
                            <main className="flex-1 p-4 transition-all duration-300">
                                <div className="p-4">
                                    {!dreamData ? (
                                        <p className="text-gray-500 tet-center">Loading roadmap...</p>
                                    ) : (
                                        <DreamboxDisplay aiResponse={dreamData.roadmap} />
                                    )}
                                </div>
                            </main>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}

export default DreamDashboard;
