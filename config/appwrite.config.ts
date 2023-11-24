import { Account, Client } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("655f0003e0d13482a2be");

const account = new Account(client);

export { account };
