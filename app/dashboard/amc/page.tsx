"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, addDays } from "date-fns"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Amc() {
    useEffect(() => {
      getSession()
    }, [])
  const router = useRouter()
  const { data: session } = useSession()
  if (!session?.user || session?.user.role === "USER") {
    return <div>Non autorisé</div>
  }

  const getNextDays = (numDays: number) => {
    const days = []
    for (let i = 0; i <= numDays; i++) {
      // Change to include today
      const date = addDays(new Date(), i)
      days.push({
        dayName: format(date, "EEEE"),
        date: format(date, "yyyy-MM-dd"),
      })
    }
    return days
  }

  const days = getNextDays(7) // Get today and the next 7 days

  const handleSelectChange = (value: string) => {
    router.push(`/dashboard/amc/day/${value}`)
  }
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-bold mb-4">Gestion des AMC</h1>
      <div className="w-full h-full flex justify-center items-center">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionnez un jour" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Prochains jours</SelectLabel>
              {days.map((day, index) => (
                <SelectItem key={index} value={day.date}>
                  {day.dayName} - {day.date}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
