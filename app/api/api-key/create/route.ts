import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const user = await getServerSession(authOptions);

    if (!user?.user) {
      return NextResponse.json(
        { error: "Unauthorized to perform this action" },
        { status: 401 }
      );
    }

    const existingApi = await db.apiKey.findFirst({
      where: {
        userId: user.user.id,
        enabled: true,
      },
    });

    if (existingApi) {
      return NextResponse.json(
        { error: "You already have a valid API key.", createApiKey: null },
        { status: 400 }
      );
    }

    const createApiKey = await db.apiKey.create({
      data: {
        userId: user.user.id,
        key: nanoid(),
      },
    });
    return NextResponse.json({ error: null, createApiKey }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues, createApiKey: null },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", createApiKey: null },
      { status: 500 }
    );
  }
}
