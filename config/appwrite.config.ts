import { Account, Avatars, Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  url: "https://cloud.appwrite.io/v1",
  projectId: "655f0003e0d13482a2be",
  databaseId: "656180c4ba7b8e527bef",
  usersCollectionId: "6561811dd90e093b4f39",
  documentsCollectionId: "656180e23579115ebcc1",
  storageId: "656180531ea81fd1bc70",
};

const client = new Client()
  .setEndpoint(appwriteConfig.url)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatar = new Avatars(client);

export { account, avatar, databases, storage };
