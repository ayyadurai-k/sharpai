
import React, { useEffect, useState } from "react";
import { Ellipsis, Loader, Upload } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { parsePDF } from "@/components/ui/parsePDF";
import { calculateScore } from "@/components/ui/calculateScore";
import { JobDescription } from "@/components/ui/JobDescription";
import { ScoreDisplay } from "@/components/ui/ScoreDisplay ";

function ATSCheckerCreate() {
    const [loading, setLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState("");
    const [resumeText, setResumeText] = useState("");
    const [scoringResult, setScoringResult] = useState(null);
    const [error, setError] = useState(null);
    const [scoreChecked, setScoreChecked] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [showInputs, setShowInputs] = useState(true);
    const [fileName, setFileName] = useState("");
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem("atsScoreCheck");
        const userLoggedIn = localStorage.getItem("userToken") !== null;
        setIsLoggedIn(userLoggedIn);

        if (storedData) {
            const { count, timestamp } = JSON.parse(storedData);
            const lastCheckTime = new Date(timestamp);
            const currentTime = new Date();

            if (currentTime - lastCheckTime > 24 * 60 * 60 * 1000) {
                localStorage.setItem("atsScoreCheck", JSON.stringify({ count: 0, timestamp: new Date() }));
                setScoreChecked(0);
            } else {
                setScoreChecked(count);
            }
        }
    }, []);

    useEffect(() => {
        if (resumeText && jobDescription) {
            console.log("Calculating ATS Score...");
            const result = calculateScore(resumeText, jobDescription);
            setScoringResult(result);
        }
    }, [resumeText, jobDescription]); // Recalculate score when resume or job description changes

    // const handleFileChange = async (event) => {
    //     const file = event.target.files[0];
    //     if (!file) return;
    //     setFileName(file.name);
    //     setError(null);

    //     try {
    //         const text = await parsePDF(file);
    //         console.log("Extracted Resume Text:", text);
    //         setResumeText(text);
    //     } catch (err) {
    //         setError("Error reading PDF file. Please try again.");
    //         console.error("Error reading file:", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setError(null);
        setLoading(true);

        toast.info("Processing resume... This may take a few seconds.", { duration: 3000 });

        try {
            const text = await parsePDF(file);
            setResumeText(text);
        } catch (err) {
            setError("Error reading PDF file. Please try again.");
            console.error("Error reading file:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckATSScore = () => {
        if (!resumeText || !jobDescription) {
            toast.error("Please upload a resume and enter a job description.");
            return;
        }

        if (!isLoggedIn) {
            const maxAttempts = 3;
            if (scoreChecked >= maxAttempts) {
                toast.error(`You have reached your daily limit (${maxAttempts} times). Please log in for unlimited access.`);
                setTimeout(() => navigate("/auth/sign-up"), 2000);
                return;
            }

            const newCount = scoreChecked + 1;
            setScoreChecked(newCount);
            localStorage.setItem("atsScoreCheck", JSON.stringify({ count: newCount, timestamp: new Date() }));
        }

        setLoading(true);
        setTimeout(() => {
            setShowInputs(false);
            setShowResults(true);
            setLoading(false);
            toast.success("ATS Score calculated successfully!");
        }, 1000);
    };

    const handleReset = () => {
        setShowInputs(true);
        setScoringResult(null);
        setJobDescription("");
        setResumeText("");
        setFileName("");
    };

    return (
        <div>
            <Toaster position="bottom-right" richColors closeButton />
            <div className="flex items-center pt-5">
                <div className="container mx-auto rounded-lg p-6 max-w-4xl">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">ATS Resume Checker</h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        {showInputs && (
                            <>
                                <div className="md:col-span-6">
                                    <div className="w-full max-w-md">
                                        <label className="flex flex-col items-center px-4 py-11 bg-white rounded-lg shadow-lg tracking-wide border border-blue-200 cursor-pointer hover:bg-blue-50 transition-colors">
                                            <Upload className="w-8 h-8 text-blue-500" />
                                            {fileName ? (
                                                <p className="mt-2 text-sm text-gray-600 text-center">
                                                    Uploaded: <strong>{fileName}</strong>
                                                </p>
                                            ) : (
                                                <span className="mt-2 text-base">Upload Resume (PDF)</span>
                                            )}
                                            <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                </div>

                                <div className="md:col-span-6">
                                    <JobDescription value={jobDescription} onChange={setJobDescription} />
                                </div>
                            </>
                        )}

                        <div className="md:col-span-12 flex flex-col items-center">
                            {showInputs ? (
                                <button
                                    className="px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
                                    onClick={handleCheckATSScore}
                                    disabled={loading}
                                >
                                    {loading ? <span className="flex items-center gap-1">
                                        Please Waiting <Ellipsis />
                                    </span> : "Check ATS Score"}
                                </button>
                            ) : (
                                <>
                                    <ScoreDisplay
                                        score={scoringResult?.score}
                                        matchedKeywords={scoringResult?.matchedKeywords}
                                        missingKeywords={scoringResult?.missingKeywords}
                                    />
                                    <button
                                        className="mt-5 px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg shadow-md hover:bg-gray-700 transition"
                                        onClick={handleReset}
                                    >
                                        {isLoggedIn || scoreChecked < 3
                                            ? "Check Another Resume"
                                            : `Daily Limit Reached (${scoreChecked}/3)`}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ATSCheckerCreate;
