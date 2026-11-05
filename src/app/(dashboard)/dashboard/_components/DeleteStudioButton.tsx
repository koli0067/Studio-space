
"use client";

import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
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
import { Button } from "@/components/ui/button";
import GetTokenFromClient from "@/lib/GetTokenFromClient";

interface DeleteStudioButtonProps {
  data: {
    _id: string;
  };
  onDelete?: (id: string) => void;
}

const DeleteStudioButton = ({ data, onDelete }: DeleteStudioButtonProps) => {
  const { _id } = data;

  const handleButtonDelete = async () => {
    const token = await GetTokenFromClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        },
      );

      const responseData = await res.json();

      console.log("Server Response:", responseData);

      if (res.ok) {
        toast.success("Studio deleted successfully!");
        onDelete?.(_id);
      } else {
        toast.error(responseData.message || "Failed to delete studio!");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="flex items-center justify-center gap-2 rounded-lg border border-red-500 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white dark:border-red-500 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
          >
            <Trash2 size={17} />
            Delete
          </Button>
        }
      />

      <AlertDialogContent className="border border-[#E8E3D9] bg-white dark:border-gray-700 dark:bg-[#1B2922]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#24352D] dark:text-white">
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slate-500 dark:text-gray-400">
            Are you sure you want to delete this studio? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-300 bg-white text-[#24352D] hover:bg-gray-100 dark:border-gray-600 dark:bg-[#24352D] dark:text-white dark:hover:bg-[#344A3F]">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleButtonDelete}
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteStudioButton;
