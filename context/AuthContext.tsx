"use client";

import Logo from "@/app/(landing)/_components/logo";
import { Loading } from "@/components/others/loader";
import { account } from "@/config/appwrite.config";
import { useRouter } from "next/navigation";
import React from "react";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

type AuthProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();

  React.useEffect(() => {
    const unsubscribe = () => {
      account
        .getSession("current")
        .then((res) => {
          setUser(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
          router.push("/");
        });
    };

    return () => unsubscribe();
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
