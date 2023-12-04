"use client";

import Cover from "@/app/(application)/_components/cover";
import Toolbar from "@/components/others/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrigger } from "@/hooks/useTrigger";
import { getDocumentbyId, updateDocument } from "@/libs/appwrite/api";
import { Router } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";

const PreviewPage = () => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/others/editor"), { ssr: false }),
    []
  );

  const params = useParams();
  const [doc, setDoc] = useState<any>([]);
  const trigger = useTrigger();
  const router = useRouter();

  const handleChange = async (content: string) => {
    await updateDocument({
      documentId: params.documentId as string,
      content,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const document = await getDocumentbyId(params.documentId as string);
      setDoc(document);
    };

    fetchData();
  }, [params.documentId, trigger.active]);

  if (doc?.length === 0) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[45%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (!doc.isPublished) throw Error("page not found");

  return (
    <div className="pb-40 min-h-screen">
      <Cover preview url={doc?.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={doc} />
        <Editor
          editable={false}
          onChange={handleChange}
          initialContent={doc?.content}
        />
      </div>
    </div>
  );
};

export default PreviewPage;
