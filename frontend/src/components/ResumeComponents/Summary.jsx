import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Brain, Loader } from "lucide-react";
import { ResumeInformationContext } from "@/context/ResumeContext";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import Backend from "../../Api/ServersideApi";
import { AIChatSession } from "../../Api/AI_Google";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

function Summary({ enabledNext }) {
  const params = useParams();
  const { Resumedata, setResumedata } = useContext(ResumeInformationContext);

  // ✅ Corrected State Initialization
  const [summary, setSummary] = useState(Resumedata?.summary || "");
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

  // ✅ Fetch Resume Data when component mounts
  useEffect(() => {
    const fetchResumeData = async () => {
      if (!Resumedata?.summary) {
        try {
          setLoading(false);
          const response = await Backend.GetResumeById(params?.resumeId);
          if (response?.data?.data?.summary) {
            const fetchedSummary = response.data.data.summary;
            setSummary(fetchedSummary);
            setResumedata((prev) => ({ ...prev, summary: fetchedSummary }));
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

  const GenerateSummeryFromAI = async () => {
    try {
      setLoading(true);

      const PROMPT = prompt.replace(
        "{jobTitle}",
        Resumedata?.personalDetails?.jobTitle || "Software Engineer"
      );


      const result = await AIChatSession.sendMessage(PROMPT);

      if (!result || !result.response) {
        throw new Error("Invalid response from AI API");
      }

      let responseText;
      try {
        responseText = await result.response.text();
      } catch (error) {
        throw new Error("Failed to read response text");
      }

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);
      } catch (error) {
        throw new Error("Failed to parse AI response");
      }


      let summariesList = [];

      // If response is an array itself, use it
      if (Array.isArray(parsedResponse)) {
        summariesList = parsedResponse;
      } else {
        // Find the first array-like property dynamically
        const arrayKey = Object.keys(parsedResponse).find((key) =>
          Array.isArray(parsedResponse[key])
        );

        if (arrayKey) {
          summariesList = parsedResponse[arrayKey];
        }
      }

      setAiGenerateSummeryList(summariesList || []);
    } catch (error) {
      console.error("Error generating summary:", error.message);
      setAiGenerateSummeryList([]); // Ensure state is always an array on error
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Context when Summary Changes
  useEffect(() => {
    setResumedata((prev) => ({
      ...prev,
      summary,
    }));
  }, [summary, setResumedata]);

  // ✅ Handle Input Change
  const summaryHandleChange = (event) => {
    enabledNext(false);
    setSummary(event.target.value);
  };

  // ✅ Save Summary Data
  const saveSummary = async (e) => {
    e.preventDefault();
    enabledNext(false);

    setLoading(true);

    try {
      const response = await Backend.sumamaryDetailsUpdate({
        resumeId: params?.resumeId,
        summary,
      });

      if (response?.data?.status === true) {
        toast.success("Summary updated successfully!");
        enabledNext?.(true);
      } else {
        toast.error("Failed to update summary.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-blue-700 border-t-4 mt-10">
        <h2 className="font-bold text-lg">Career Objective</h2>
        <p>Add a career objective for your job title</p>

        <form className="mt-7" onSubmit={saveSummary}>
          <div className="flex justify-between items-end">
            <label className="text-sm font-medium">
              Add Summary <span className="text-red-500">*</span>
            </label>
            .
            <Button
              variant="outline"
              type="button"
              size="sm"
               className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
   font-medium shadow-lg hover:from-blue-600 hover:to-blue-800 text-white rounded-md  disabled:opacity-50 flex items-center gap-2"
              onClick={() => GenerateSummeryFromAI()}
              required
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>

          {/* ✅ Fixed Textarea to Bind Correctly */}
          <textarea
            className="mt-5 w-full h-32 p-3 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
            required
            placeholder="Write your summary here..."
            autoComplete="off"
            value={summary} // ✅ Ensures data is displayed
            onChange={summaryHandleChange}
          />

          <div className="mt-2 flex justify-end">
            <Button type="submit"
            
             className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
   font-medium shadow-lg hover:from-blue-600 hover:to-blue-800 text-white rounded-md  disabled:opacity-50 flex items-center gap-2"
            disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-[#000000]">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
