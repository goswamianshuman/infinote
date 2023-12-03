"use client";

import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

type Props = {
  handleFileUpload: (file: File | null) => void;
};

const ImageUploader = ({ handleFileUpload }: Props) => {
  const [isfile, setIsFile] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files?.[0];

    if (droppedFiles) {
      setIsFile(true);
      setFile(droppedFiles);
    }
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const selectedFiles = e.target.files?.[0];

      if (selectedFiles) {
        setIsFile(true);
        setFile(selectedFiles);
      }
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`flex flex-col items-center border-[2px] py-4 rounded-sm border-dashed ${
        isfile && "border-[#C024D6]"
      }`}
    >
      <div className="flex flex-col items-center py-5">
        <div
          className={`p-5 border-[2px] w-max rounded-full flex items-center justify-center ${
            isfile && "border-[#C024D6]"
          }`}
        >
          <Upload className="h-[30px] w-[30px]" />
        </div>

        <div className="mt-2 flex flex-col items-center justify-center">
          <input
            type="file"
            accept=".png, .jpeg, .jpg, .gif, .bmp, .tiff, .webp, .svg, .raw, .heif"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
            multiple
          />
          <Button
            onClick={() => {
              const fileInput = document.querySelector(
                "input[type=file]"
              ) as HTMLInputElement | null;
              if (fileInput) {
                fileInput.click();
              }
            }}
            variant="outline"
            size="lg"
            className="mt-2 border-white/80"
          >
            Select Image
          </Button>
          <p className="text-xs text-center font-mono mt-3 text-[#C024D6]">
            {isfile ? file?.name : "upload your cover image"}
          </p>
        </div>
      </div>
      <h3>or</h3>

      <h3 className="uppercase tracking-wide mt-2 text-xl font-semibold">
        drag and drop file
      </h3>

      {isfile && (
        <Button
          onClick={() => handleFileUpload(file)}
          size="lg"
          className="mt-2"
        >
          Upload Image
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;
