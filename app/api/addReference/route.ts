import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
  }
  const { ref, refPeinture } = await req.json()

  try {
    const newReference = await prisma.references.create({
      data: { ref, refPeinture },
    })
    return NextResponse.json(newReference, { status: 201 })
  } catch (error) {
    console.error("Error creating chef request:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
