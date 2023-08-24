import ApiKeyDashboard from "@/components/api-dashboard";
import RequestApiKey from "@/components/request-api-key";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Similarity API | SHARULL | Dashboard",
  description: "Text similarity tester API Free and Open source project.",
};

export default async function Page() {
  const user = await getServerSession(authOptions);

  if (!user) return notFound();

  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: user.user.id,
      enabled: true,
    },
  });
  return (
    <div className="max-w-7xl mx-auto mt-16">
      {apiKey ? <ApiKeyDashboard /> : <RequestApiKey />}
    </div>
  );
}
