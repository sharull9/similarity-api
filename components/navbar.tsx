import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle-button";
import { SignInButton, SignOutButton } from "./auth-button";
import { authOptions } from "@/lib/auth";

type Props = {};

export default async function Navbar({}: Props) {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-0 top-0 right-0 left-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex items-center justify-between">
        <Button variant="link" className="p-0">
          <Link href={"/"}>SHARULL API v1.0</Link>
        </Button>
        <div className="md:hidden">
          <ModeToggle />
        </div>
        <div className="hidden md:flex gap-4">
          <ModeToggle />
          <Button variant="ghost" asChild>
            <Link href={"/documentation"}>Documentation</Link>
          </Button>
          {session ? (
            <>
              <Button variant="ghost" asChild>
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
}
