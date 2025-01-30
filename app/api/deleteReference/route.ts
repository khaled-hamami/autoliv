import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();
  try {
    const reference = await prisma.references.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(reference);
  } catch (error) {
    console.error("Error deleting reference:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
