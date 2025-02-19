"use client"
import Table from "@/components/Table"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DayPage() {
  const toast = useToast()
  const router = useRouter()

  const initialCabState: CabState = {
    RefActuel: "",
    PeintureActuel: "",
    Changement: "",
    PeintureApresChangement: "",
    Time: "",
    ChangementStatus: "empty",
  }
  type CabState = {
    RefActuel: string
    PeintureActuel: string
    Changement: string
    PeintureApresChangement: string
    Time: string
    ChangementStatus: "empty" | "pending" | "done"
  }
  type Reference = {
    id: number
    ref: string
    refPeinture: string
  }
  const [AMCAState, setAMCAState] = useState<CabState[]>([])
  const [AMCBState, setAMCBState] = useState<CabState[]>([])
  const [AMCCState, setAMCCState] = useState<CabState[]>([])
  const [references, setReferences] = useState<Reference[]>([])

  const { id } = useParams()

  useEffect(() => {
    const fetchReferences = async () => {
      const response = await fetch("/api/getReferences")
      const data = await response.json()
      setReferences(data)
    }
    fetchReferences()

    // Add padding to the body when the component mounts
    document.body.style.paddingBottom = "4rem"

    // Remove padding when the component unmounts
    return () => {
      document.body.style.paddingBottom = "0"
    }
  }, [])

  useEffect(() => {
    const fetchDay = async () => {
      const response = await fetch("/api/amc/getAmcByDate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: id }),
      })
      const data = await response.json()

      setAMCAState(data?.amca || [])
      setAMCBState(data?.amcb || [])
      setAMCCState(data?.amcc || [])
    }

    if (id) {
      fetchDay()
    }
  }, [id])

  useEffect(() => {
    setCabStatesAMCA(
      AMCAState.length === 0 ? Array(16).fill(initialCabState) : AMCAState
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AMCAState])

  useEffect(() => {
    setCabStatesAMCB(
      AMCBState.length === 0 ? Array(16).fill(initialCabState) : AMCBState
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AMCBState])

  useEffect(() => {
    setCabStatesAMCC(
      AMCCState.length === 0 ? Array(16).fill(initialCabState) : AMCCState
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AMCCState])

  const [cabStatesAMCA, setCabStatesAMCA] = useState<CabState[]>(
    Array(16).fill(initialCabState)
  )
  const [cabStatesAMCB, setCabStatesAMCB] = useState<CabState[]>(
    Array(16).fill(initialCabState)
  )
  const [cabStatesAMCC, setCabStatesAMCC] = useState<CabState[]>(
    Array(16).fill(initialCabState)
  )

  const handleSaveDay = async () => {
    try {
      const response = await fetch("/api/amc/saveAmc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: id,
          amca: cabStatesAMCA,
          amcb: cabStatesAMCB,
          amcc: cabStatesAMCC,
        }),
      })
      if (!response.ok) {
        toast.toast({
          title: "Erreur",
          description: "Erreur lors de la sauvegarde du jour",
          variant: "destructive",
        })
      }
      toast.toast({
        title: "Succès",
        description: "Jour sauvegardé avec succès",
      })
      router.push("/dashboard/amc")
      const data = await response.json()
      console.log("Save response:", data)
    } catch (error) {
      console.error("Error saving the day:", error)
    }
  }

  return (
    <div className="w-full flex flex-col ml-64">
      <div className="w-full flex justify-evenly">
        <Card className="flex justify-center py-4 rounded-none">
          <CardTitle className="text-2xl vertical-text text-center">
            AMC A
          </CardTitle>
        </Card>
        <div className="w-full">
          <Table
            from="dashboard"
            AMC="AMCA"
            DATA={references}
            cabStates={cabStatesAMCA}
            setCabStates={setCabStatesAMCA}
          />
        </div>
      </div>
      <div className="w-full h-4  bg-black"></div>
      <div className="w-full flex justify-evenly">
        <Card className="flex justify-center py-4 rounded-none">
          <CardTitle className="text-2xl vertical-text text-center">
            AMC B
          </CardTitle>
        </Card>
        <div className="w-full">
          <Table
            from="dashboard"
            AMC="AMCB"
            DATA={references}
            cabStates={cabStatesAMCB}
            setCabStates={setCabStatesAMCB}
          />
        </div>
      </div>
      <div className="w-full h-4 bg-black"></div>
      <div className="w-full flex justify-evenly">
        <Card className="flex justify-center py-4 rounded-none">
          <CardTitle className="text-2xl vertical-text text-center">
            AMC C
          </CardTitle>
        </Card>
        <div className="w-full">
          <Table
            from="dashboard"
            AMC="AMCC"
            DATA={references}
            cabStates={cabStatesAMCC}
            setCabStates={setCabStatesAMCC}
          />
        </div>
      </div>
      <div className="w-full flex justify-center mt-4">
        <Button className="w-1/3" onClick={handleSaveDay}>
          Confirme ce jour
        </Button>
      </div>
    </div>
  )
}
