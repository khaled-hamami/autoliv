import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const session = await auth()
  try {
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    const { userId } = await req.json()
    await prisma.user.delete({
      where: { id: userId },
    })

    return NextResponse.json({ message: "Utilisateur supprimé avec succès" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json(
      { message: "Erreur lors de la suppression de l'utilisateur" },
      { status: 500 }
    )
  }
}