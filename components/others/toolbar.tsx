"use client";

import React, { ElementRef, useRef, useState } from "react";
import { IconPicker } from "./iconPicker";
import { Button } from "../ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { useTrigger } from "@/hooks/useTrigger";
import { removeIcon, updateDocument } from "@/libs/appwrite/api";
import { toast } from "sonner";
import TextAreaAutoSize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/useCoverImage";

type Props = {
  initialData: any;
  preview?: boolean;
};

const Toolbar = ({ initialData, preview }: Props) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const trigger = useTrigger();
  const coverImage = useCoverImage();

  const [value, setValue] = useState(initialData.title);

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setValue(initialData.title);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
      handleSave();
    }
  };

  const handleSave = () => {
    const update = updateDocument({
      documentId: initialData.$id,
      title: value || "Untitled",
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

  const handleSelectIcon = (icon: string) => {
    const update = updateDocument({
      documentId: initialData.$id,
      icon: icon,
    })
      .then(() => {
        trigger.activate();
      })
      .catch((error) => {
        console.log(error);
      });

    toast.promise(update, {
      loading: "updating your icon... 🍀",
      success: "icon updated successfully! ✅",
      error: "Failed to update icon 😢",
    });
  };

  const handleRemoveIcon = () => {
    const update = removeIcon(initialData.$id).then(() => {
      trigger.activate();
    });

    toast.promise(update, {
      loading: "removing icon.. 🍀",
      success: "icon removed successfully! ✅",
      error: "Failed to remove icon 😢",
    });
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={handleSelectIcon}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={handleRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-3 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={handleSelectIcon}>
            <Button
              variant={"outline"}
              size={"sm"}
              className="text-muted-foreground text-xs"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            variant={"outline"}
            size={"sm"}
            className="text-muted-foreground text-xs"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextAreaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => handleChange(e)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[12px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] flex items-center"
        >
          {initialData.title}
        </div>
      )}
      {isEditing && !preview && (
        <p className="text-muted-foreground text-xs font-mono font-thin">
          press enter to save
        </p>
      )}
    </div>
  );
};

export default Toolbar;
