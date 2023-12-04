import {
  account,
  appwriteConfig,
  avatar,
  databases,
  storage,
} from "@/config/appwrite.config";
import { ID, Query, QueryTypes } from "appwrite";

export async function signInAccount({ provider }: { provider: string }) {
  try {
    const session = await account.createOAuth2Session(
      provider,
      "http://localhost:3000/dashboard",
      "http://localhost:3000/",
      []
    );

    return session;
  } catch (error) {
    console.error(error);
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.error(error);
  }
}

export async function createUserAccount({ currentUser }: { currentUser: any }) {
  try {
    const avatarUrl = avatar.getInitials(currentUser?.name);

    const newUser = await saveUsertoDb({
      id: currentUser?.$id,
      email: currentUser?.email,
      name: currentUser?.name,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);

    return error;
  }
}

export async function saveUsertoDb(user: {
  id: string | undefined;
  email: string | undefined;
  name: string | undefined;
  imageUrl: URL | undefined;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );

    console.log(newUser);

    return newUser;
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentUser({
  currentAccount,
}: {
  currentAccount: any;
}) {
  try {
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("id", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
}

export async function checkExistingUser({
  currentAccount,
}: {
  currentAccount: any;
}) {
  try {
    const currentUser = await getCurrentUser({ currentAccount });

    if (currentUser?.$id) return true;

    return false;
  } catch (error) {
    console.error(error);
  }
}

export type NewDocProp = {
  userId: string;
  title: string;
  coverImage?: File[];
  coverImageId?: string;
  content?: string;
  isArchived?: boolean;
  parentDocument?: string;
  isPublished?: boolean;
  icon?: string;
};

export async function createDocument(doc: NewDocProp) {
  try {
    const newDoc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      ID.unique(),
      {
        doc_creator: doc.userId,
        coverImage: doc.coverImage, //set here url
        title: doc.title,
        content: doc.content,
        isArchived: doc.isArchived,
        parentDocument: doc.parentDocument,
        isPublished: doc.isPublished,
        coverImageId: doc.coverImageId,
        icon: doc.icon,
      }
    );

    return newDoc;
  } catch (error) {
    console.log(error);
  }
}

export async function getSidebarParentDoc(
  parentDocument?: string /** expects document id */
) {
  try {
    const getAcc = await getAccount();
    const currentUser = await getCurrentUser({ currentAccount: getAcc });

    if (!currentUser) throw Error;

    const query: QueryTypes = [
      Query.equal("doc_creator", currentUser?.$id),
      Query.equal("isArchived", false),
      Query.orderAsc("$createdAt"),
    ];

    if (!parentDocument) {
      // Exclude documents with non-null parentDocument
      query.push(Query.isNull("parentDocument"));
    } else {
      // Include documents with specific parentDocument
      query.push(Query.equal("parentDocument", parentDocument));
    }

    const documents = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      query
    );

    return documents;
  } catch (error) {
    console.log(error);
  }
}

export async function getDocumentbyId(documentId?: string) {
  if (!documentId) throw Error;

  try {
    const document = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      documentId
    );

    if (!document) {
      throw new Error("Not found");
    }

    if (document.isPublished && !document.isArchived) {
      return document;
    }

    return document;
  } catch (error) {
    console.log(error);
  }
}

export async function setDocumentAsArchive(documentId?: string) {
  try {
    const getAcc = await getAccount();
    const currentUser = await getCurrentUser({ currentAccount: getAcc });

    if (!currentUser) throw new Error("Unauthenticated");

    const recursiveArchive = async (docId: string) => {
      const children = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.documentsCollectionId,
        [
          Query.equal("doc_creator", currentUser.$id),
          Query.equal("parentDocument", docId),
        ]
      );

      for (const child of children.documents) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.documentsCollectionId,
          child.$id,
          {
            isArchived: true,
          }
        );

        await recursiveArchive(child.$id);
      }
    };

    const document = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      documentId as string,
      {
        isArchived: true,
      }
    );

    recursiveArchive(documentId as string);

    return document;
  } catch (error) {
    console.log(error);
  }
}

export async function getTrashDocument() {
  try {
    const getAcc = await getAccount();
    const currentUser = await getCurrentUser({ currentAccount: getAcc });

    if (!currentUser) throw new Error("Unauthenticated");

    const document = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      [
        Query.equal("doc_creator", currentUser.$id),
        Query.equal("isArchived", true),
        Query.orderAsc("$createdAt"),
      ]
    );

    return document;
  } catch (error) {
    console.log(error);
  }
}

export async function restoreDocument(documentId?: string) {
  try {
    const getAcc = await getAccount();
    const currentUser = await getCurrentUser({ currentAccount: getAcc });

    if (!currentUser) throw new Error("Unauthenticated");

    const existingDocument = await getDocumentbyId(documentId);

    if (!existingDocument) throw new Error("Not found");

    const recursiveRestore = async (docId: string) => {
      const children = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.documentsCollectionId,
        [
          Query.equal("doc_creator", currentUser.$id),
          Query.equal("parentDocument", docId),
        ]
      );

      for (const child of children.documents) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.documentsCollectionId,
          child.$id,
          {
            isArchived: false,
          }
        );

        await recursiveRestore(child.$id);
      }
    };

    if (existingDocument.parentDocument) {
      const parent = await getDocumentbyId(existingDocument.parentDocument);

      if (parent?.isArchived) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.documentsCollectionId,
          documentId as string,
          {
            parentDocument: null,
          }
        );
      }
    }

    const document = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      documentId as string,
      {
        isArchived: false,
      }
    );

    recursiveRestore(documentId as string);

    return document;
  } catch (error) {
    console.log(error);
  }
}

export async function removeDocument(documentId?: string) {
  try {
    const existingDocument = await getDocumentbyId(documentId);

    if (!existingDocument) throw new Error("Not found");

    const document = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      documentId as string
    );

    return document;
  } catch (error) {
    console.log(error);
  }
}

export async function searchDocumentByName(name: string) {
  let doc = undefined;

  if (name.length === 0) {
    doc = await getTrashDocument();
  } else {
    doc = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      [Query.equal("isArchived", true), Query.search("title", name)]
    );
  }

  if (!doc) throw Error;

  return doc.documents;
}

export async function getDocumentForSearching() {
  const getAcc = await getAccount();
  const currentUser = await getCurrentUser({ currentAccount: getAcc });

  if (!currentUser) throw Error;

  const doc = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.documentsCollectionId,
    [
      Query.equal("doc_creator", currentUser?.$id),
      Query.equal("isArchived", false),
      Query.orderAsc("$createdAt"),
      // Query.search("title", name),
    ]
  );

  if (!doc) throw Error;

  return doc.documents;
}

type UpdateProps = {
  documentId: string;
  title?: string;
  content?: string;
  coverImage?: string;
  icon?: string;
  isPublished?: boolean;
};

export async function updateDocument(props: UpdateProps) {
  try {
    const { documentId, ...rest } = props;

    const document = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      documentId,
      {
        ...rest,
      }
    );

    return document;
  } catch (error) {
    console.log(error);
  }
}

export async function removeIcon(documentId: string) {
  try {
    const document = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      documentId,
      {
        icon: null,
      }
    );

    return document;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(documentId: string, fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    const document = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      documentId,
      {
        coverImage: null,
        coverImageId: null,
      }
    );

    return document;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFileToDoc(documentId: string, file: File) {
  try {
    const existingDocument = await getDocumentbyId(documentId);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    const uploadedFile = await uploadFile(file);

    if (!uploadedFile) throw Error;

    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      await deleteFile(existingDocument.$id, uploadedFile.$id);
      throw Error;
    }

    const document = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.documentsCollectionId,
      documentId,
      {
        coverImage: fileUrl,
        coverImageId: uploadedFile.$id,
      }
    );

    return document;
  } catch (error) {
    console.log(error);
  }
}

export async function replaceFileInDoc(documentId: string, file: File) {
  const existingDocument = await getDocumentbyId(documentId);

  if (!existingDocument) {
    throw new Error("Not found");
  }

  if (!existingDocument.coverImage && !existingDocument.coverImageId) {
    throw new Error("No document exists");
  }

  await deleteFile(existingDocument.$id, existingDocument.coverImageId);

  const document = await uploadFileToDoc(documentId, file);

  return document;
}
