import { prisma } from "@/prisma"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    await prisma.day.deleteMany()
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Failed to delete days:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    { success: false, error: "Method Not Allowed" },
    { status: 405 }
  )
}
