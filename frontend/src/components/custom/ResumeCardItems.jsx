
import { Loader, Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Backend from "../../Api/ServersideApi";
import cv from "../../assets/cv.png"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (!resume?.resumeId) {
      toast.error("Resume ID is missing!");
      return;
    }
    setLoading(true);
    try {
      await Backend.DeleteResumeById(resume.resumeId);
      toast.success("Resume Deleted!");
      refreshData();
      setOpenAlert(false);
    } catch (error) {
      toast.error("Failed to delete resume.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <Link to={"/newresume/resume/" + resume.resumeId + "/edit"}>
        <div
          className="p-14 
        h-[280px] bg-gray-200
          rounded-t-lg border-t-4
        "
        >
          <div
            className="flex 
        items-center justify-center h-100vh  "
          >
            <img src={cv} loading="lazy" width={80} height={80} />
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between  text-white rounded-b-lg shadow-lg"

      >
        <h2 className="text-sm text-black font-bold">{resume.resumeTitle}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer text-black " />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigate("/newresume/resume/" + resume.resumeId + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate("/my-resume/" + resume.resumeId + "/view")
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate("/my-resume/" + resume.resumeId + "/view")
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete your resume?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Deleting your resume will permanently remove all associated data from our system.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
