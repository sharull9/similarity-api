"use client";
import { CreateApiKey } from "@/helpers/create-api-key";
import { Key } from "lucide-react";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import CopyButton from "./copy-button";
import SpinLoader from "./loader";
import { Heading, Paragraph } from "./text-component";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function RequestApiKey() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const form = useForm();

  const createApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const generatedApiKey = await CreateApiKey();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error("something went wrong");
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col gap-6 items-center">
        <Key className="mx-auto h-12 w-12 to-gray-400" />
        <Heading>Request your API Key</Heading>
        <Paragraph>You haven&apos;t requested an API key.</Paragraph>
      </div>
      <form onSubmit={createApiKey} className="mt-6 sm:flex sm:items-center">
        <div className="relative rounded-md shadow-md sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <CopyButton
              className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
              valueToCopy={apiKey}
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key to display it here"
          />
        </div>
        <div className="mt-6 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <Button disabled={!!apiKey}>
            {isCreating ? <SpinLoader /> : ""}
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
}
