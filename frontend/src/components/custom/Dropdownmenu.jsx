import React from "react"
import { Link } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

function ResumeDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="group flex items-center gap-1 px-2 py-2 font-medium  bg-transparent border border-transparent outline-none transition 
        hover:bg-white hover:text-gray-800 hover:border-gray-300
        data-[state=open]:text-blue-600 data-[state=open]:border-blue-600"
            >
                Resume
                <span
                    className="transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180"
                >
                    <ChevronDown className="w-4 h-4" />
                </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 mt-2 rounded-lg shadow-lg bg-white ring-1 ring-gray-200 transition">
                <DropdownMenuItem asChild>
                    <Link to="/newresume" className="w-full px-2 py-1 hover:bg-gray-200 rounded-full transition">
                        Resume Builder
                    </Link>
                </DropdownMenuItem>
             
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ResumeDropdown
