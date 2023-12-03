"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/useCoverImage";
import ImageUploader from "./imageUploader";
import { useParams } from "next/navigation";
import { replaceFileInDoc, uploadFileToDoc } from "@/libs/appwrite/api";
import { toast } from "sonner";
import { useTrigger } from "@/hooks/useTrigger";
import { Models } from "appwrite";

type Props = {};

const CoverImageDailog = (props: Props) => {
  const coverImage = useCoverImage();
  const trigger = useTrigger();
  const params = useParams();

  const handleFileUpload = (file: File | null) => {
    let upload;

    if (coverImage.url) {
      upload = replaceFileInDoc(params.documentId as string, file as File).then(
        () => {
          trigger.activate();
          coverImage.onClose;
        }
      );
    } else {
      upload = uploadFileToDoc(params.documentId as string, file as File).then(
        () => {
          trigger.activate();
          coverImage.onClose;
        }
      );
    }

    toast.promise(upload as Promise<Models.Document | undefined>, {
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
