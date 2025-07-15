import React, { useState } from "react";
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ScoreDisplay = ({
  score = 0,
  matchedKeywords = [],
  missingKeywords = [],
}) => {
  const [showAllMatched, setShowAllMatched] = useState(false);
  const [showAllMissing, setShowAllMissing] = useState(false);

  // Limit displayed items to 10 unless expanded
  const matchedToShow = showAllMatched ? matchedKeywords : matchedKeywords.slice(0, 10);
  const missingToShow = showAllMissing ? missingKeywords : missingKeywords.slice(0, 10);

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* ATS Score Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">ATS Score</h2>
          <div className="w-24 h-24">
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              styles={buildStyles({
                textSize: "16px",
                textColor: "#333",
                pathColor: `hsl(${score}, 70%, 45%)`,
                trailColor: "#e0e0e0",
              })}
            />
          </div>
        </div>

        {/* Matched Keywords Section */}
        <div>
          <h3 className="flex items-center justify-center text-lg font-semibold text-green-600 mb-2">
            <CheckCircle className="w-5 h-5 mr-2" />
            Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2 justify-start">
            {matchedToShow.length > 0 ? (
              matchedToShow.map((keyword) => (
                <span
                  key={keyword}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No matched keywords.</p>
            )}
          </div>
          {matchedKeywords.length > 10 && (
            <button
              className="mt-2 text-blue-500 flex items-center"
              onClick={() => setShowAllMatched(!showAllMatched)}
            >
              {showAllMatched ? "See Less" : "See More"}
              {showAllMatched ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>
          )}
        </div>

        {/* Missing Keywords Section */}
        <div>
          <h3 className="flex items-center justify-center text-lg font-semibold text-red-600 mb-2">
            <XCircle className="w-5 h-5 mr-2" />
            Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2 justify-start">
            {missingToShow.length > 0 ? (
              missingToShow.map((keyword) => (
                <span
                  key={keyword}
                  className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No missing keywords.</p>
            )}
          </div>
          {missingKeywords.length > 10 && (
            <button
              className="mt-2 text-blue-500 flex items-center"
              onClick={() => setShowAllMissing(!showAllMissing)}
            >
              {showAllMissing ? "See Less" : "See More"}
              {showAllMissing ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
