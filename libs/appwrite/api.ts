import {
  account,
  appwriteConfig,
  avatar,
  databases,
} from "@/config/appwrite.config";
import { ID, Query } from "appwrite";

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

    // console.log(currentUser.documents[0]);

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
