"use client";

import Cover from "@/app/(application)/_components/cover";
import Toolbar from "@/components/others/toolbar";
import { useTrigger } from "@/hooks/useTrigger";
import { getDocumentbyId } from "@/libs/appwrite/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const DocumentsPage = () => {
  const params = useParams();
  const [doc, setDoc] = useState<any>([]);
  const trigger = useTrigger();

  useEffect(() => {
    const fetchData = async () => {
      const document = await getDocumentbyId(params.documentId as string);
      setDoc(document);
    };

    fetchData();
  }, [trigger.active]);

  if (doc?.length === 0 || doc === undefined) {
    return <div>loading...</div>;
  }

  if (doc === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={doc?.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={doc} />
      </div>
    </div>
  );
};

export default DocumentsPage;
