import { CreateApiData } from "@/types/api/create-api";

export async function RevokeApiKey() {
  const res = await fetch("/api/api-key/revoke");
  const data = (await res.json()) as CreateApiData;
  if (data.error || !data.createdApiKey) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(" "));
    }
    throw new Error(data.error ?? "Something went wrong.");
  }

  return data.createdApiKey.key;
}
