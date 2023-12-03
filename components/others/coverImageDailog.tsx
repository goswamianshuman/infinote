"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/useCoverImage";
import ImageUploader from "./imageUploader";
import { useParams } from "next/navigation";
import { uploadFileToDoc } from "@/libs/appwrite/api";
import { toast } from "sonner";
import { useTrigger } from "@/hooks/useTrigger";

type Props = {};

const CoverImageDailog = (props: Props) => {
  const coverImage = useCoverImage();
  const trigger = useTrigger();
  const params = useParams();

  const handleFileUpload = (file: File | null) => {
    const upload = uploadFileToDoc(
      params.documentId as string,
      file as File
    ).then(() => {
      trigger.activate();
      coverImage.onClose;
    });

    toast.promise(upload, {
      loading: "uploading image... 💭",
      success: "image uploaded successfully! 📓",
      error: "Failed to upload title 😢",
    });
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div className="">
          <ImageUploader handleFileUpload={handleFileUpload} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageDailog;
