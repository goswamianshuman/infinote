import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "../libs/providers/theme-provider";

export const metadata: Metadata = {
  title: "Infinote",
  description: "An endless canvas for seamless and swift tasks",
  icons: {
    icon: [
      {
        url: "/logo.png",
        href: "/logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="the-infinote-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
