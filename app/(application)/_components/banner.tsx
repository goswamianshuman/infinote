"use client";

import { Button } from "@/components/ui/button";
import { useTrigger } from "@/hooks/useTrigger";
import {
  getDocumentbyId,
  removeDocument,
  restoreDocument,
} from "@/libs/appwrite/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmDailog from "@/components/others/confirmDailog";

type Props = {
  documentId?: string;
};

const Banner = ({ documentId }: Props) => {
  const trigger = useTrigger();
  const router = useRouter();

  const handleRestore = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    documentId: string
  ) => {
    e.stopPropagation();
    const restore = restoreDocument(documentId).then((res) => {
      router.push(`/dashboard/documents/${res?.$id}`);
      trigger.activate();
    });

    toast.promise(restore, {
      loading: "Restoring note... ⏪",
      success: "Note restored successfully! 📓",
      error: "Failed to restore note 😢",
    });
  };

  const handleRemove = async (documentId: string) => {
    const documents = removeDocument(documentId).then(() => {
      router.push("/dashboard");
      trigger.activate();
    });

    toast.promise(documents, {
      loading: "deleting note permanently... ⏪",
      success: "Note deleted successfully! 📓",
      error: "Failed to delete note 😢",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-4 justify-center">
      <p className="font-mono font-thin">Current page is inside page...</p>

      <Button
        size="sm"
        onClick={(e) => handleRestore(e, documentId as string)}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore
      </Button>
      <ConfirmDailog onConfirm={() => handleRemove(documentId as string)}>
        <Button
          size="sm"
          variant={"default"}
          className="bg-white text-black hover:bg-white/80 p-1 px-2 h-auto font-normal"
        >
          Delete Permanently
        </Button>
      </ConfirmDailog>
    </div>
  );
};

export default Banner;
