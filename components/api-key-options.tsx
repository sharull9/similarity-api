"use client";
import { CreateApiKey } from "@/helpers/create-api-key";
import { RevokeApiKey } from "@/helpers/revoke-api-key";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Ban, Copy, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import SpinLoader from "./loader";
import { Button } from "./ui/button";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";

type Props = { apiKey: string };

export default function ApikeyOptions({ apiKey }: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  const router = useRouter();
  const createNewApiKey = async () => {
    setIsCreating(true);
    try {
      await RevokeApiKey();
      await CreateApiKey();
      router.refresh();
    } catch (error) {
      toast.error("Error Creating New API key");
    } finally {
      setIsCreating(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true);
    try {
      await RevokeApiKey();
      router.refresh();
    } catch (error) {
      toast("Error revoking your API key");
    } finally {
      setIsRevoking(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreating || isRevoking} asChild>
        <Button variant={"ghost"} className="flex gap-2 items-center">
          <p>
            {isCreating
              ? "Creating New Key"
              : isRevoking
              ? "Revoking Key"
              : "Options"}
            {isCreating || isRevoking ? <SpinLoader /> : null}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex justify-between gap-2"
          onClick={() => {
            navigator.clipboard.writeText(apiKey);
            toast.success("Copied!");
          }}
        >
          Copy <Copy className="w-3 h-3" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-between gap-2"
          onClick={createNewApiKey}
        >
          Create New Key <PlusCircle className="w-3 h-3" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-between gap-2"
          onClick={revokeCurrentApiKey}
        >
          Revoke Key <Ban className="w-3 h-3" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
