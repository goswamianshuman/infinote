"use client";

import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useTrigger } from "@/hooks/useTrigger";
import { deleteFile, getDocumentbyId } from "@/libs/appwrite/api";
import { cn } from "@/utils/utils";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  url?: string;
  preview?: boolean;
};

const Cover = ({ preview, url }: Props) => {
  const params = useParams();
  const coverImage = useCoverImage();
  const trigger = useTrigger();
  const [doc, setDoc] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const document = await getDocumentbyId(params.documentId as string);
      setDoc(document);
    };

    fetchData();
  }, [trigger.active]);

  const handleDelete = () => {
    deleteFile(params.documentId as string, doc.coverImageId as string).then(
      () => {
        trigger.activate();
        return toast.message("Deleted SuccessFully..");
      }
    );
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image fill src={url} alt="Cover" className="object-cover" />}

      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs border-white/50"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" /> Change cover
          </Button>
          <Button
            onClick={handleDelete}
            className="text-white/80 text-xs"
            variant="destructive"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" /> Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;
