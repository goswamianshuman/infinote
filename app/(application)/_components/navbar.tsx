"use client";

import { getDocumentbyId } from "@/libs/appwrite/api";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";
import { useTrigger } from "@/hooks/useTrigger";
import Publish from "@/components/others/publish";

type Props = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

const Navbar = ({ isCollapsed, onResetWidth }: Props) => {
  const params = useParams();
  const trigger = useTrigger();
  const [doc, setDoc] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const document = await getDocumentbyId(params.documentId as string);
      setDoc(document);
    };

    fetchData();
  }, [params.documentId, trigger.active]);

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
            <Publish initalData={doc} />
            <Menu documentId={doc.$id} />
          </div>
        </div>
      </nav>

      {doc.isArchived && <Banner documentId={doc.$id} />}
    </>
  );
};

export default Navbar;
