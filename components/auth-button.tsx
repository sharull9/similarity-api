"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import SpinLoader from "./loader";
import { toast } from "react-hot-toast";

export function SignOutButton() {
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const logout = async () => {
    setIsLoadind(true);
    toast.promise(signOut(), {
      loading: "Logging in...",
      success: "",
      error: (
        <b>
          Error logging in...
          <br /> Please try again later.
        </b>
      ),
    });
    setIsLoadind(false);
  };
  return (
    <Button onClick={logout} disabled={isLoading}>
      {isLoading ? <SpinLoader /> : null}Logout
    </Button>
  );
}
export function SignInButton() {
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const login = async () => {
    setIsLoadind(true);
    toast.promise(signIn("google"), {
      loading: "Logging out...",
      success: "",
      error: (
        <b>
          Error logging out...
          <br /> Please try again later.
        </b>
      ),
    });
    setIsLoadind(false);
  };
  return (
    <Button onClick={login} disabled={isLoading}>
      {isLoading ? <SpinLoader /> : null} Login
    </Button>
  );
}
