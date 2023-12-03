"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrigger } from "@/hooks/useTrigger";
import { updateDocument } from "@/libs/appwrite/api";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  initialData: any;
};

const Title = ({ initialData }: Props) => {
  const inputRef = useRef<ElementRef<"input">>(null);
  const trigger = useTrigger();
  const [title, setTitle] = useState(initialData.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
      handleSave();
    }
  };

  const handleSave = () => {
    const update = updateDocument({
      documentId: initialData.$id,
      title: title || "Untitled",
    })
      .then(() => {
        setIsEditing(false);
        trigger.activate();
      })
      .catch((error) => {
        console.log(error);
      });

    toast.promise(update, {
      loading: "updating your title... 💭",
      success: "title updated successfully! 📓",
      error: "Failed to update title 😢",
    });
  };

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}

      {isEditing ? (
        <div className="flex items-center gap-x-3">
          <Input
            ref={inputRef}
            onBlur={disableInput}
            onClick={enableInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={title}
            className="h-7 px-2 focus-visible:ring-transparent"
          />
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1"
          onClick={enableInput}
        >
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

export default Title;

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-5 w-32 rounded-md" />;
};
