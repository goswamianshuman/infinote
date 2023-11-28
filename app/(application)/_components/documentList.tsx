"use client";

import { getSidebarParentDoc } from "@/libs/appwrite/api";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Item from "./item";
import { cn } from "@/utils/utils";
import { FileIcon } from "lucide-react";

type Props = {
  parentDocumentId?: string;
  level?: number;
  data?: any[];
};

const DocumentList = ({ parentDocumentId, level = 0 }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [getDoc, setDoc] = useState<any>();

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSidebarParentDoc(parentDocumentId);
        setDoc(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });

  // getSidebarParentDoc(parentDocumentId)
  //   .then((res) => setDoc(res))
  //   .catch((err) => console.log(err));

  const onRedirect = (documentId: string) => {
    router.push(`/dashboard/documents/${documentId}`);
  };

  if (getDoc == undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div
        style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
        className={cn(
          "hidden text-sm px-3 font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages found 🙂
      </div>

      {getDoc?.documents.map((document: any) => (
        <div key={document.$id}>
          <Item
            documentId={document.$id}
            onClick={() => onRedirect(document.$id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document.$id}
            level={level}
            onExpand={() => onExpand(document.$id)}
            expanded={expanded[document.$id]}
          />

          {expanded[document.$id] && (
            <DocumentList parentDocumentId={document.$id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
