import { NextResponse } from "next/server"
import { format, startOfDay, subDays } from "date-fns"
import { prisma } from "@/prisma"

type CabState = {
  RefActuel: string
  PeintureActuel: string
  Changement: string
  PeintureApresChangement: string
  Time: string
  ChangementStatus: "empty" | "pending" | "done"
}

export async function GET() {
  const date = new Date()
  const todayString = format(date, "yyyy-MM-dd")
  const todayUTC = startOfDay(new Date(todayString)) // Adjust to UTC

  const yesterdayString = format(subDays(date, 1), "yyyy-MM-dd")
  const yesterdayUTC = startOfDay(new Date(yesterdayString)) // Adjust to UTC

  const todayData = await prisma.day.findFirst({
    where: { date: todayUTC },
  })

  const yesterdayData = await prisma.day.findFirst({
    where: { date: yesterdayUTC },
  })

  if (!todayData) {
    if (!yesterdayData) {
      return NextResponse.json({ message: "No data for today and yesterday" })
    }

    const {
      amca: yesterdayAmca,
      amcb: yesterdayAmcb,
      amcc: yesterdayAmcc,
    } = yesterdayData as unknown as {
      amca: CabState[]
      amcb: CabState[]
      amcc: CabState[]
    }

    const updatedAmca = Array.isArray(yesterdayAmca)
      ? yesterdayAmca.map((cab: CabState) => ({
          RefActuel:
            cab.ChangementStatus === "done" ? cab.Changement : cab.RefActuel,
          Changement: "",
          PeintureActuel:
            cab.ChangementStatus === "done"
              ? cab.PeintureApresChangement
              : cab.PeintureActuel,
          PeintureApresChangement: "",
          Time: "",
          ChangementStatus: "empty",
        }))
      : yesterdayAmca

    const updatedAmcb = Array.isArray(yesterdayAmcb)
      ? yesterdayAmcb.map((cab: CabState) => ({
          RefActuel:
            cab.ChangementStatus === "done" ? cab.Changement : cab.RefActuel,
          Changement: "",
          PeintureActuel:
            cab.ChangementStatus === "done"
              ? cab.PeintureApresChangement
              : cab.PeintureActuel,
          PeintureApresChangement: "",
          Time: "",
          ChangementStatus: "empty",
        }))
      : yesterdayAmcb

    const updatedAmcc = Array.isArray(yesterdayAmcc)
      ? yesterdayAmcc.map((cab: CabState) => ({
          RefActuel:
            cab.ChangementStatus === "done" ? cab.Changement : cab.RefActuel,
          Changement: "",
          PeintureActuel:
            cab.ChangementStatus === "done"
              ? cab.PeintureApresChangement
              : cab.PeintureActuel,
          PeintureApresChangement: "",
          Time: "",
          ChangementStatus: "empty",
        }))
      : yesterdayAmcc

    await prisma.day.create({
      data: {
        date: todayUTC,
        amca: updatedAmca,
        amcb: updatedAmcb,
        amcc: updatedAmcc,
      },
    })

    return NextResponse.json({ message: "override worked" })
  }

  if (!yesterdayData) {
    return NextResponse.json({ message: "No data for yesterday" })
  }

  const {
    amca: todayAmca,
    amcb: todayAmcb,
    amcc: todayAmcc,
  } = todayData as unknown as {
    amca: CabState[]
    amcb: CabState[]
    amcc: CabState[]
  }
  const {
    amca: yesterdayAmca,
    amcb: yesterdayAmcb,
    amcc: yesterdayAmcc,
  } = yesterdayData as unknown as {
    amca: CabState[]
    amcb: CabState[]
    amcc: CabState[]
  }

  const updatedAmca =
    Array.isArray(todayAmca) && Array.isArray(yesterdayAmca)
      ? todayAmca.map((cab: CabState, index: number) => ({
          ...cab,
          RefActuel:
            (yesterdayAmca[index] as CabState)?.ChangementStatus === "done"
              ? (yesterdayAmca[index] as CabState)?.Changement
              : cab.RefActuel === ""
              ? (yesterdayAmca[index] as CabState)?.RefActuel
              : cab.RefActuel,

          PeintureActuel:
            (yesterdayAmca[index] as CabState)?.ChangementStatus === "done"
              ? (yesterdayAmca[index] as CabState)?.PeintureApresChangement
              : cab.RefActuel === ""
              ? ""
              : cab.PeintureActuel,
          PeintureApresChangement:
            cab.RefActuel === "" ? "" : cab.PeintureApresChangement,
          Time: cab.RefActuel === "" ? "" : cab.Time,
          ChangementStatus:
            cab.RefActuel === "" ? "empty" : cab.ChangementStatus,
        }))
      : todayAmca

  const updatedAmcb =
    Array.isArray(todayAmcb) && Array.isArray(yesterdayAmcb)
      ? todayAmcb.map((cab: CabState, index: number) => ({
          ...cab,
          RefActuel:
          (yesterdayAmcb[index] as CabState)?.ChangementStatus === "done"
            ? (yesterdayAmcb[index] as CabState)?.Changement
            : cab.RefActuel === ""
            ? (yesterdayAmcb[index] as CabState)?.RefActuel
            : cab.RefActuel,

          PeintureActuel:
            (yesterdayAmcb[index] as CabState)?.ChangementStatus === "done"
              ? (yesterdayAmcb[index] as CabState)?.PeintureApresChangement
              : cab.RefActuel === ""
              ? ""
              : cab.PeintureActuel,
          PeintureApresChangement:
            cab.RefActuel === "" ? "" : cab.PeintureApresChangement,
          Time: cab.RefActuel === "" ? "" : cab.Time,
          ChangementStatus:
            cab.RefActuel === "" ? "empty" : cab.ChangementStatus,
        }))
      : todayAmcb

  const updatedAmcc =
    Array.isArray(todayAmcc) && Array.isArray(yesterdayAmcc)
      ? todayAmcc.map((cab: CabState, index: number) => ({
          ...cab,
          RefActuel:
          (yesterdayAmcc[index] as CabState)?.ChangementStatus === "done"
            ? (yesterdayAmcc[index] as CabState)?.Changement
            : cab.RefActuel === ""
            ? (yesterdayAmcc[index] as CabState)?.RefActuel
            : cab.RefActuel,
          Changement:
            cab.RefActuel === ""
              ? (yesterdayAmcc[index] as CabState)?.Changement
              : cab.Changement,
          PeintureActuel:
            (yesterdayAmcc[index] as CabState)?.ChangementStatus === "done"
              ? (yesterdayAmcc[index] as CabState)?.PeintureApresChangement
              : cab.RefActuel === ""
              ? ""
              : cab.PeintureActuel,
          PeintureApresChangement:
            cab.RefActuel === "" ? "" : cab.PeintureApresChangement,
          Time: cab.RefActuel === "" ? "" : cab.Time,
          ChangementStatus:
            cab.RefActuel === "" ? "empty" : cab.ChangementStatus,
        }))
      : todayAmcc

  await prisma.day.update({
    where: { date: todayUTC },
    data: {
      amca: updatedAmca,
      amcb: updatedAmcb,
      amcc: updatedAmcc,
    },
  })

  return NextResponse.json({
    amca: updatedAmca,
    amcb: updatedAmcb,
    amcc: updatedAmcc,
  })
}
