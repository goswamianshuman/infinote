"use client";

import ConfirmDailog from "@/components/others/confirmDailog";
import { Loading } from "@/components/others/loader";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import { useTrigger } from "@/hooks/useTrigger";
import {
  getTrashDocument,
  removeDocument,
  restoreDocument,
  searchDocumentByName,
} from "@/libs/appwrite/api";
import { Search, Trash, UndoIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {};

const TrashBox = (props: Props) => {
  const { user }: any = useAuthContext();
  const router = useRouter();
  const params = useParams();
  const [filterDoc, setFilterDoc] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const trigger = useTrigger();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    searchDocumentByName(search)
      .then((res) => {
        setFilterDoc(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [search, trigger.active]);

  const handleClick = (documentId: string) => {
    router.push(`/dashboard/documents/${documentId}`);
  };

  const handleRestore = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: string
  ) => {
    e.stopPropagation();
    const restore = restoreDocument(documentId).then((res) => {
      router.push(`/dashboard/documents/${res?.$id}`);
      trigger.activate();
    });

    toast.promise(restore, {
      loading: "Restoring note... ⏪",
      success: "Note restored successfully! 📓",
      error: "Failed to restore note 😢",
    });
  };

  const handleRemove = async (documentId: string) => {
    const documents = removeDocument(documentId).then(() => {
      router.push("/dashboard");
      trigger.activate();
    });

    toast.promise(documents, {
      loading: "deleting note permanently... ⏪",
      success: "Note deleted successfully! 📓",
      error: "Failed to delete note 😢",
    });

    if (params.documentId === documentId) {
      router.push("/dashboard");
    }
  };

  if (user?.documents === undefined) {
    return (
      <div className="hfull flex flex-col items-center justify-center p-4">
        <Loading size="large" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Search by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        {loading && filterDoc.length === 0 && (
          <div className="flex items-center justify-center min-h-[50px] min-w-full">
            <Loading size="large" />
          </div>
        )}

        {!loading && filterDoc.length === 0 && (
          <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
            No documents found
          </p>
        )}

        {filterDoc.map((data: any) => (
          <div
            key={data.$id}
            role="button"
            onClick={() => handleClick(data.$id)}
            className="text-sm rounded-sm w-full hover:bg-primary/10 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{data.title}</span>
            <div className="flex items-center gap-2">
              <div
                role="button"
                onClick={(e) => handleRestore(e, data.$id)}
                className="rounded-sm p-2 hover:bg-primary/5"
              >
                <UndoIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmDailog onConfirm={() => handleRemove(data.$id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-primary/5"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmDailog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
