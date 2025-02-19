import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    const { userId, newRole } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error changing role:", error);
    return NextResponse.json({ error: "Failed to change role" }, { status: 500 });
  }
}