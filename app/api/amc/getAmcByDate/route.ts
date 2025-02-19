import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"
import { parseISO } from "date-fns"

export async function POST(req: NextRequest) {
  const { date } = await req.json()
  try {
    const parsedDate = parseISO(date)
    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate,
      },
    })
    return NextResponse.json(day)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "An error occurred while fetching the data" },
      { status: 500 }
    )
  }
}
