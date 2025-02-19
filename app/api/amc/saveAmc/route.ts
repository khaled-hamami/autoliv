import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"
import { parseISO } from "date-fns"
import { auth } from "@/auth"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
  }
  const { date, amca, amcb, amcc } = await req.json()

  try {
    const parsedDate = parseISO(date)
    const existingDay = await prisma.day.findFirst({
      where: {
        date: parsedDate,
      },
    })

    console.log("Received data:", { date, amca, amcb, amcc })

    if (existingDay) {
      // Update existing day
      const updatedDay = await prisma.day.update({
        where: {
          id: existingDay.id,
        },
        data: {
          amca: amca,
          amcb: amcb,
          amcc: amcc,
        },
      })
      console.log("Updated day:", updatedDay)
      return NextResponse.json(updatedDay)
    } else {
      // Create new day
      const newDay = await prisma.day.create({
        data: {
          date: parsedDate,
          amca: amca,
          amcb: amcb,
          amcc: amcc,
        },
      })
      console.log("Created new day:", newDay)
      return NextResponse.json(newDay)
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "An error occurred while saving the data" },
      { status: 500 }
    )
  }
}
