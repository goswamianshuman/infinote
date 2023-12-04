"use client";

import React, { useState } from "react";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/useOrigin";
import { updateDocument } from "@/libs/appwrite/api";
import { useTrigger } from "@/hooks/useTrigger";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Check, Copy, Globe } from "lucide-react";

type Props = {
  initalData: any;
};

const Publish = ({ initalData }: Props) => {
  const origin = useOrigin();
  const trigger = useTrigger();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initalData.$id}`;

  const handlePublish = () => {
    setIsSubmitting(true);

    const promise = updateDocument({
      documentId: initalData.$id,
      isPublished: true,
    })
      .then(() => {
        trigger.activate();
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    toast.promise(promise, {
      loading: "Publishing the document.. 🚩",
      success: "Document published successfully! 📢",
      error: "Unable to publish document. 😢",
    });
  };

  const handleUnPublish = () => {
    setIsSubmitting(true);

    const promise = updateDocument({
      documentId: initalData.$id,
      isPublished: false,
    })
      .then(() => {
        trigger.activate();
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    toast.promise(promise, {
      loading: "UnPublishing the document.. 🚩",
      success: "Document unpublished successfully! 📢",
      error: "Unable to unpublish document. 😢",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <Button size="sm" variant="outline" className="px-4">
          Publish
          {initalData.isPublished && (
            <Globe className="h-4 w-4 ml-2 text-blue-500" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initalData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-blue-500 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-muted-foreground">
                The document is live..
              </p>
            </div>

            <div className="flex items-center">
              <input
                value={url}
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={handleUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              share with others..
            </span>
            <Button
              disabled={isSubmitting}
              onClick={handlePublish}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
