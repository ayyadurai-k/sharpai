import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Loader } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Backend from "../Api/ServersideApi"
import { toast } from "sonner";

const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
    },
};

function DreamBoxForm() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const generateAIResponse = async (values, setSubmitting) => {
        try {
            setIsLoading(true);

            const response = await Backend.generateRoadmap(values);
            const parsedResponse = response.data;

            if (parsedResponse.nodes && parsedResponse.connections) {
                const adjustedNodes = parsedResponse.nodes.map((node, index) => {
                    let x = 0, y = 0;
                    if (index !== 0) {
                        const angle = (index - 1) * (360 / (parsedResponse.nodes.length - 1));
                        const radius = 150;
                        x = Math.round(radius * Math.cos((angle * Math.PI) / 180));
                        y = Math.round(radius * Math.sin((angle * Math.PI) / 180));
                    }
                    return {
                        ...node,
                        x,
                        y,
                        type: "circle",
                        userContent: values,
                    };
                });

                const roadmapId = uuidv4();

                const finalRoadmap = {
                    nodes: adjustedNodes,
                    connections: parsedResponse.connections,
                };

                const newRoadmap = {
                    roadmapId,
                    roadmap: finalRoadmap,
                    userInput: values,
                };
    
    

                // Get existing roadmaps or create new object
                const existingRoadmaps = JSON.parse(localStorage.getItem("roadmap-dream")) || {};
                existingRoadmaps[roadmapId] = {
                    id: roadmapId,
                    roadmap: finalRoadmap,
                    userInput: values,
                };

                // Save back to localStorage
                localStorage.setItem("roadmap-dream", JSON.stringify(existingRoadmaps))
                
                const saveResponse = await Backend.dreamboxfromdata(newRoadmap);
                if (saveResponse.status === 200 || saveResponse.status === 201) {
                    toast.success("Dream roadmap saved successfully!");
                } else {
                    toast.error("Failed to save roadmap. Try again later.");
                }

                // Navigate to dashboard with ID
                navigate(`/dreambox-dashboard/${roadmapId}`);
            } else {
                alert("AI response is missing required data.");
            }
        } catch (err) {
            console.error("AI Error:", err);
            alert("An error occurred while generating the AI response.");
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };






    const formik = useFormik({
        initialValues: {
            CareerAspiration: "",
            IndustryField: "",
            DesiredJobPosition: "",
        },
        validationSchema: Yup.object({
            CareerAspiration: Yup.string().required("Career Aspirations are required"),
            IndustryField: Yup.string().required("Industry / Field is required"),
            DesiredJobPosition: Yup.string().required("Desired Job Position is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            await generateAIResponse(values, setSubmitting);
        },
    });

    return (
        <div className="flex justify-center pt-5">
            <motion.form
                onSubmit={formik.handleSubmit}
                className="p-8 rounded-lg max-w-3xl w-full pt-5"
                initial="hidden"
                animate="visible"
                variants={inputVariants}
            >
                <motion.h1 className="text-black text-3xl mb-6">
                    Fill out the fields to get career guidance.
                </motion.h1>

                {["CareerAspiration", "IndustryField", "DesiredJobPosition"].map((field) => (
                    <motion.div key={field} className="mb-4" variants={inputVariants}>
                        <label htmlFor={field} className="block text-black mb-2">
                            {field.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <input
                            id={field}
                            name={field}
                            type="text"
                            value={formik.values[field]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                            className="w-full p-4 border rounded-lg hover:bg-slate-200 outline-none"
                        />
                        {formik.touched[field] && formik.errors[field] && (
                            <p className="text-red-500 text-sm">{formik.errors[field]}</p>
                        )}
                    </motion.div>
                ))}

                <motion.div className="mb-4 flex justify-end" variants={inputVariants}>
                    <button
                        type="submit"
                        className={`w-52 p-4 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 
               ${formik.isValid && !formik.isSubmitting && !isLoading
                                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:opacity-90"
                                : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 cursor-not-allowed text-white"
                            }`}
                        disabled={!formik.isValid || formik.isSubmitting || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader className="h-6 w-6 animate-spin text-white" />
                                <span className="text-white">Generating... Wait a 10 seconds</span>
                            </>
                        ) : (
                            <>
                                <Brain className="h-6 w-6" />
                                <span>Generate</span>
                            </>
                        )}
                    </button>
                </motion.div>
            </motion.form>
        </div>
    )
}

export default DreamBoxForm