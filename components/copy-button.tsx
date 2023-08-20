"use client";

import { Copy } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

type Props = {
  valueToCopy: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function CopyButton({
  valueToCopy,
  className,
  ...props
}: Props) {
  return (
    <Button
      {...props}
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);
        toast.success("Copied!");
      }}
      className={className}
      variant={"ghost"}
    >
      <Copy className="h-5 w-5" />
    </Button>
  );
}
