import "@/app/globals.css";
import Navbar from "@/components/navbar";
import SessionProvider from "@/components/providers";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Similarity API | SHARULL | Home",
  description: "Text similarity tester API Free and Open source project.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("antialiased min-h-screen", inter.className)}
      suppressHydrationWarning
    >
      <body className="bg-slate-50 dark:bg-slate-900 antialiased">
        <Navbar />
        <div className="h-20"></div>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>{children}</SessionProvider>
        </Providers>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
