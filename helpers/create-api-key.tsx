import { CreateApiData } from "@/types/api/create-api";
import React from "react";

export async function CreateApiKey() {
  const res = await fetch("/api/api-key/create");
  const data = (await res.json()) as CreateApiData;
  if (data.error || !data.createdApiKey) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(" "));
    }
    throw new Error(data.error ?? "Something went wrong.");
  }

  return data.createdApiKey.key;
}
