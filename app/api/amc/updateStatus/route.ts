import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/prisma"
import { parseISO } from "date-fns"
import { auth } from "@/auth"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (
    !session?.user ||
    (session.user.role !== "VERIFIEDUSER" && session.user.role !== "ADMIN")
  ) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
  }

  const { date, amc, typeAmc } = await req.json()

  if (!date || !amc || !typeAmc) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  try {
    const parsedDate = parseISO(date)
    let dataToUpdate
    if (typeAmc === "AMCA") {
      dataToUpdate = { amca: amc }
    } else if (typeAmc === "AMCB") {
      dataToUpdate = { amcb: amc }
    } else if (typeAmc === "AMCC") {
      dataToUpdate = { amcc: amc }
    } else {
      return NextResponse.json(
        { error: "Invalid typeAmc value" },
        { status: 400 }
      )
    }

    const updatedDay = await prisma.day.update({
      where: { date: parsedDate },
      data: dataToUpdate,
    })

    return NextResponse.json(updatedDay, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
