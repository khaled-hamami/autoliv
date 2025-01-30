import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const references = await prisma.references.findMany();
    return NextResponse.json(references);
  } catch (error) {
    console.error("Error fetching references:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
