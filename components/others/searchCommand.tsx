"use client";

import React, { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useSearch } from "@/hooks/useSearch";
import { useAuthContext } from "@/context/AuthContext";
import { getDocumentForSearching } from "@/libs/appwrite/api";
import { useTrigger } from "@/hooks/useTrigger";

type Props = {};

const SearchCommand = (props: Props) => {
  const { user }: any = useAuthContext();
  const router = useRouter();
  const [mounted, setIsmounted] = useState(false);
  const [docs, setDocs] = useState<any>([]);
  const trigger = useTrigger();
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  const onSelect = (id: string) => {
    router.push(`/dashboard/documents/${id}`);
    onClose();
  };

  useEffect(() => {
    setIsmounted(true);
    trigger.activate();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const documents = await getDocumentForSearching();
      setDocs(documents);
    };

    fetchdata();
  }, [mounted, toggle, trigger.active]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);

    return () => {
      document.removeEventListener("keydown", down);
    };
  }, [toggle]);

  if (!mounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search in ${user?.name}'s infinote...`} />
      <CommandList>
        <CommandEmpty>No Results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {docs?.map((document: any) => (
            <CommandItem
              key={document.$id}
              value={`${document.$id}-${document.title}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <>
                  <File className="mr-2 h-4 w-4" />
                </>
              )}

              <span className="">{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
