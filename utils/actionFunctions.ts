import { toast } from "sonner";
import { createDocument } from "@/libs/appwrite/api";

type onCreateProps = {
  title: string;
  user_id: string;
  content?: string;
  coverImage?: File[];
  coverImageId?: string;
  icon?: string;
  isArchived?: boolean;
  isPublished?: boolean;
  parentDocument?: string;
};

export const onCreate = ({
  user_id,
  title,
  content,
  coverImage,
  coverImageId,
  icon,
  isArchived,
  isPublished,
  parentDocument,
}: onCreateProps) => {
  const createNewDocument = createDocument({
    userId: user_id,
    title,
    content,
    coverImage,
    coverImageId,
    icon,
    isArchived,
    isPublished,
    parentDocument,
  });

  toast.promise(createNewDocument, {
    loading: "Creating note for you... 👾",
    success: "New note created for you! 📓",
    error: "Failed to create note 😢",
  });
};
