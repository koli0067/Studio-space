
"use client";

import { Button } from "@/components/ui/button";
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
          authorization: `Bearer ${token}`, // এটি headers এর ভেতরে রাখতে হবে
        },
      }
    );

    const responseData = await res.json();

    console.log("Server Response:", responseData);

    if (res.ok) {
      toast.success("Studio deleted successfully!");
      onDelete?.(_id);
    } else {
      toast.error(
        responseData.message || "Failed to delete studio!"
      );
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
            className="flex items-center justify-center gap-2 rounded-lg border border-red-500 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={17} />
            Delete
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this studio?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction onClick={handleButtonDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteStudioButton;
