"use client";

import { getDocumentbyId } from "@/libs/appwrite/api";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();

  useEffect(() => {
    const checkExistingDoc = async () => {
      const doc = await getDocumentbyId(params.documentId as string);

      if (doc === undefined) {
        throw Error("page not found");
      }
    };

    checkExistingDoc();
  }, [params.documentId]);

  return <main>{children}</main>;
}
