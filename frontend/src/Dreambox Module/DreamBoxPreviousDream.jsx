import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Trash2 } from 'lucide-react';
import Backend from "../Api/ServersideApi";
import { toast } from "sonner";

function DreamBoxPreviousDream({ onDreamDeleted }) {
  const [dreamList, setDreamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDreams = async () => {
    try {
      const response = await Backend.GetAllDreamData();

      if (response.status !== 200) {
        toast.error(`Failed to fetch dreams. Status: ${response.status}`);
        return;
      }

      const dreams = response.data || [];

      const formattedDreams = dreams.map((dream) => ({
        id: dream.roadmapId,
        dream: dream.userInput?.CareerAspiration || "No title",
      }));

      setDreamList(formattedDreams);
      if (dreams.length > 0) {
        toast.success("Dreams loaded successfully");
      }
    } catch (error) {
      console.error("Error fetching dreams:", error);
      toast.error("An error occurred while fetching dreams");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roadmapId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this dream?");
  if (!confirmDelete) return;
    try {
      const response = await Backend.DeleteDreamById(roadmapId);
      if (response.status === 200 || response.status === 201) {
        toast.success("Dream deleted successfully");
        if (onDreamDeleted) onDreamDeleted(roadmapId);
        window.location.reload();
      } else {
        toast.error("Failed to delete dream");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An error occurred while deleting the dream");
    }
  };

  useEffect(() => {
    fetchDreams();
  }, []);

  
  useEffect(() => {
    if (!loading && dreamList.length === 0 ) {
      toast.info("No dreams left. Redirecting to DreamBox form...");
      navigate('/dreambox-form');
    }
  }, [dreamList, loading, navigate]);

  return (
    <div>
      <h2 className="text-md font-semibold mb-2">Previous Dreams</h2>

      {loading ? (
        <div className="flex justify-center items-center p-4">
          <Loader2 className="animate-spin text-gray-400 w-5 h-5" />
        </div>
      ) : (
        <div className="max-h-[400px] overflow-y-auto pr-1">
          <ul className="space-y-2">
            {dreamList.length > 0 ? (
              dreamList.map(({ id, dream }) => (
                <li
                  key={id}
                  className="group flex justify-between items-center cursor-pointer list-none pt-2 hover:bg-gray-100 rounded"
                >
                  <p
                    className="font-medium text-stone-500 group-hover:text-black p-1"
                    onClick={() => navigate(`/dreambox-dashboard/${id}`)}
                  >
                    {dream.slice(0, 25)}{dream.length > 25 ? "..." : ""}
                  </p>
                  <Trash2
                    size={16}
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(id);
                    }}
                  />
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-400 p-2">No dreams found.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DreamBoxPreviousDream;
