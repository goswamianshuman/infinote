import React from "react";
import { AuthContextProvider } from "@/context/AuthContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
