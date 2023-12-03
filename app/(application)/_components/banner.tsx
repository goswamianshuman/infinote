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
  const [doc, setDoc] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const document = await getDocumentbyId(documentId as string);
      setDoc(document);
    };

    fetchData();
  });

  const handleRestore = () => {
    const restore = restoreDocument(documentId);

    toast.promise(restore, {
      loading: "Restoring note... ⏪",
      success: "Note restored successfully! 📓",
      error: "Failed to restore note 😢",
    });

    trigger.activate();
  };

  const handleRemove = () => {
    const documents = removeDocument(documentId);

    toast.promise(documents, {
      loading: "deleting note permanently... ⏪",
      success: "Note deleted successfully! 📓",
      error: "Failed to delete note 😢",
    });

    trigger.activate();
    router.push("/dashboard");
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-4 justify-center">
      <p className="font-mono font-thin">Current page is inside page...</p>

      <Button
        size="sm"
        onClick={handleRestore}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore
      </Button>
      <ConfirmDailog onConfirm={() => handleRemove}>
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
