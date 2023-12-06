"use client";

import Logo from "@/app/(landing)/_components/logo";
import { Loading } from "@/components/others/loader";
import { account } from "@/config/appwrite.config";
import {
  checkExistingUser,
  createUserAccount,
  getAccount,
  getCurrentUser,
} from "@/libs/appwrite/api";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

type AuthProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchData = async ({ res }: { res: any }) => {
    const userExists = await checkExistingUser({ currentAccount: res });
    const fetchCurrentUser = await getCurrentUser({ currentAccount: res });

    if (!userExists) {
      createUserAccount({ currentUser: res }).then((data) => {
        setUser(data);
        setLoading(false);
      });
    } else {
      setUser(fetchCurrentUser);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccount()
        .then((res) => {
          // console.log("this is response: ", res);
          if (res) {
            fetchData({ res });
          } else {
            setUser(null);
            router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
          router.push("/");
        });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="h-full w-full top-0 left-0 bg-background dark:bg-[#121212] flex flex-col items-center justify-center absolute inset-0">
          <Loading size="icon" />
          <Logo />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
