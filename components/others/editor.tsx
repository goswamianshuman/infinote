"use client";

import React from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { appwriteConfig, storage } from "@/config/appwrite.config";
import { ID } from "appwrite";
import { getFilePreview } from "@/libs/appwrite/api";

type Props = {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({ onChange, editable, initialContent }: Props) => {
  const { resolvedTheme } = useTheme();

  const upload = async (file: File) => {
    const response = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    const url = getFilePreview(response.$id);

    return url;
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
