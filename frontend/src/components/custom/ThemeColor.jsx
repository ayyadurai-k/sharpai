import React, { useContext, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { ResumeInformationContext } from "@/context/ResumeContext";

function ThemeColor() {
    const colors = [
       "#000000", "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF",
    ];

    const { Resumedata, setResumedata } = useContext(ResumeInformationContext);
    const [selectedColor, setSelectedColor] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const onColorSelect = (color) => {
        setSelectedColor(color);
        setResumedata({
            ...Resumedata,
            themeColor: color,
        });
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block">
            {/* Theme Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm bg-white hover:bg-gray-100"
            >
                <LayoutGrid className="w-4 h-4" />
                Theme
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg p-5 z-50">
                    <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
                    <div className="grid grid-cols-5 gap-5">
                        {colors.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => onColorSelect(item)}
                                className={`h-5 w-5 p-2 rounded cursor-pointer border hover:border-white ${selectedColor === item ? "border-white" : "border-transparent"
                                    }`}
                                style={{ background: item }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ThemeColor;
