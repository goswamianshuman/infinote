"use client";

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
          console.error(err);
          setUser(null);
          router.push("/");
        });
    };

    return () => unsubscribe();
  }, []);

  // React.useEffect(() => {
  //   const fetchData = () => {
  //     try {
  //       if (session) {
  //         setUser(session);
  //       } else {
  //         setUser(null);
  //       }

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching session:", error);
  //     }
  //   };

  //   return () => fetchData();
  // }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
