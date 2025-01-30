import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { ref, refPeinture } = await req.json();

  try {
    const newReference = await prisma.references.create({
      data: { ref, refPeinture },
    });
    return NextResponse.json(newReference, { status: 201 });
  } catch (error) {
    console.error("Error creating chef request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
