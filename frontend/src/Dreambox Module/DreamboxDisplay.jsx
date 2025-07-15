import React, { useState, useEffect, useRef } from "react";
import ReactFlow, {
    Controls,
    Background,
    addEdge,
    useNodesState,
    useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const colors = ["#add8e6", "yellow"];

function NodeModal({ isOpen, onClose, nodeData }) {
    if (!isOpen || !nodeData) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-end items-center z-50">
            <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="bg-white w-full max-w-md h-full shadow-xl rounded-l-lg p-6 flex flex-col"
            >
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                    {nodeData.label}
                </h2>
                <div className="flex-1 overflow-y-auto">
                    {nodeData.resources?.length > 0 ? (
                        <ol className="list-decimal pl-5 space-y-2">
                            {nodeData.resources.map((resource, index) => (
                                <li key={index} className="border-b pb-3">
                                    <p className="text-lg font-bold">
                                        Step {index + 1}: {resource.title || `Resource ${index + 1}`}
                                    </p>
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        {resource.url}
                                    </a>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {resource.description}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="text-gray-600">No resources available.</p>
                    )}
                </div>
                <button
                    className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    onClick={onClose}
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
}

function DreamboxDisplay({ aiResponse }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const pdfRef = useRef(null);
    const [selectedNodeData, setSelectedNodeData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let processedNodes = [];
        let processedEdges = [];

        if (!aiResponse || aiResponse.error) {
            const storedDreams = JSON.parse(localStorage.getItem("dreams")) || [];
            if (storedDreams.length > 0) {
                aiResponse = storedDreams[storedDreams.length - 1].roadmap;
            }
        }

        if (aiResponse?.nodes && aiResponse?.connections) {
            processedNodes = aiResponse.nodes.map((node, index) => ({
                id: node.id.toString(),
                data: {
                    label: `${node.id} - ${node.title}`,
                    resources: node.resources || [],
                },
                position: { x: node.x, y: node.y },
                type: "default",
                style: {
                    backgroundColor: colors[index % colors.length],
                    color: "black",
                    padding: "5px",
                    borderRadius: "8px",
                },
            }));

            processedEdges = aiResponse.connections.map((connection) => ({
                id: `e${connection.from}-${connection.to}`,
                source: connection.from.toString(),
                target: connection.to.toString(),
                animated: true,
                markerEnd: { type: "arrowclosed" },
                style: { stroke: "gray", strokeWidth: 3 },
            }));
        }

        setNodes(processedNodes);
        setEdges(processedEdges);
    }, [aiResponse]);

    const onConnect = (params) =>
        setEdges((eds) =>
            addEdge(
                {
                    ...params,
                    markerEnd: { type: "arrowclosed" },
                    style: { stroke: "#000", strokeWidth: 2 },
                },
                eds
            )
        );

    const onNodeClick = (event, node) => {
        setSelectedNodeData(node.data);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleDownloadPDF = async () => {
        const input = pdfRef.current;
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
        pdf.save("diagram.pdf");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "700px" }}>
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-xl md:text-base font-bold">Your Career Roadmap</h1>
            <button
                    onClick={handleDownloadPDF}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    Download PDF
                </button>
            </div>

            <div ref={pdfRef} style={{ flex: 1, width: "100%" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    fitView
                    className="text-black font-normal"
                >
                    <Controls />
                    <Background color="#E0E0E0" variant="dots" gap={12} size={1} />
                </ReactFlow>
            </div>
            <NodeModal
                isOpen={isModalOpen}
                onClose={closeModal}
                nodeData={selectedNodeData}
            />
        </div>
    );
}

export default DreamboxDisplay;
