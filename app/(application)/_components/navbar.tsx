"use client";

import { getDocumentbyId } from "@/libs/appwrite/api";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";

type Props = {
  isCollapsed: boolean;
  doc: any;
  onResetWidth: () => void;
};

const Navbar = ({ doc, isCollapsed, onResetWidth }: Props) => {
  if (doc?.length === 0 || doc === undefined) {
    return (
      <nav className="bg-background dark:bg-[#121212] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (doc === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#121212] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}

        <div className="flex items-center justify-between w-full">
          <Title initialData={doc} />
          <div className="flex items-center gap-x-2">
            <Menu documentId={doc.$id} />
          </div>
        </div>
      </nav>

      {doc.isArchived && <Banner documentId={doc.$id} />}
    </>
  );
};

export default Navbar;
