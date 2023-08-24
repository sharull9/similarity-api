import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request, response: Response) {
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

    if (!existingApi) {
      return NextResponse.json(
        { error: "This API key could not be revoked.", success: false },
        { status: 500 }
      );
    }

    await db.apiKey.update({
      where: {
        id: existingApi.id,
      },
      data: {
        enabled: false,
      },
    });

    return NextResponse.json({ error: null, success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
