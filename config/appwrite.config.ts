import { Account, Avatars, Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_URL as string,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  databaseId: process.env.NEXT_PUBLIC_DATABASE_ID as string,
  usersCollectionId: process.env.NEXT_PUBLIC_USER_COLLECTION_ID as string,
  documentsCollectionId: process.env
    .NEXT_PUBLIC_API_DOCUMENTS_COLLECTION_ID as string,
  storageId: process.env.NEXT_PUBLIC_STORAGE_ID as string,
};

const client = new Client()
  .setEndpoint(appwriteConfig.url)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatar = new Avatars(client);

export { account, avatar, databases, storage, client };
