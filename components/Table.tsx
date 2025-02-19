import React, { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { getSession, useSession } from "next-auth/react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

type Reference = {
  id: number
  ref: string
  refPeinture: string
}
type CabState = {
  RefActuel: string
  PeintureActuel: string
  Changement: string
  PeintureApresChangement: string
  Time: string
  ChangementStatus: "empty" | "pending" | "done"
}

export default function Table({
  AMC,
  DATA,
  cabStates,
  setCabStates,
  from,
}: {
  AMC: string
  DATA: Reference[]
  cabStates: CabState[]
  setCabStates: React.Dispatch<React.SetStateAction<CabState[]>>
  from: "planification" | "dashboard"
}) {
  /******************* DEBUG ******************/
  // useEffect(() => {
  //   console.log("debug", cabStates)
  // }, [cabStates])
  /********************************************/
  const [openDialogs, setOpenDialogs] = useState<boolean[]>(
    Array(16).fill(false)
  )
  const pathname = usePathname()

  const extractDateFromRoute = () => {
    const dateMatch = pathname.match(/\/Planification\/(\d{4}-\d{2}-\d{2})/)
    return dateMatch ? dateMatch[1] : null
  }

  const handleConfirm = (index: number) => {
    if (
      session?.user.role !== "VERIFIEDUSER" &&
      session?.user.role !== "ADMIN"
    ) {
      console.log("Non autorisé")
      return
    }
    const date = extractDateFromRoute()
    const updateAmc = async () => {
      try {
        const newCabStates: CabState[] = cabStates.map((state, i) => {
          if (i === index) {
            return {
              ...state,
              ChangementStatus: "done" as const,
            }
          }
          return state
        })

        setCabStates(newCabStates) // Update the state

        const response = await fetch("/api/amc/updateStatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: date,
            amc: newCabStates,
            typeAmc: AMC,
          }),
        })

        if (!response.ok) {
          console.error("Failed to update AMC data")
          return
        }

        const data = await response.json()
        console.log("Update response:", data)
      } catch (error) {
        console.error("Error updating AMC data:", error)
      }
    }
    updateAmc()
    setOpenDialogs(openDialogs.map((open, i) => (i === index ? false : open)))
  }
  const { data: session } = useSession()
  const isLoggedIn = session && session?.user
  // const isAdmin = session && session?.user && session?.user?.role === "ADMIN"

  useEffect(() => {
    getSession()
  }, [])
  return (
    <React.Fragment key={AMC}>
      {/**************************************    AMC 1 -> 8   ***************************************/}
      <div className="flex items-center justify-center  bg-gray-100 w-full px-1 rounded-lg">
        <div className="overflow-x-auto w-full rounded-lg">
          <table className="w-full border border-gray-300 shadow-lg rounded-lg bg-white ">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-400 text-white text-center">
                <th></th>
                {[...Array(8)].map((_, index) => (
                  <th
                    key={index}
                    colSpan={2}
                    className="text-black w-[100px]"
                    id={`CAB-A0${index + 1}`}
                  >
                    CAB-A0{index + 1}
                    {(session?.user.role === "VERIFIEDUSER" ||
                      session?.user.role === "ADMIN") && (
                      <Dialog
                        open={openDialogs[index]}
                        onOpenChange={(isOpen) =>
                          setOpenDialogs(
                            openDialogs.map((open, i) =>
                              i === index ? isOpen : open
                            )
                          )
                        }
                      >
                        <DialogTrigger asChild>
                          <Button className="p-0 h-auto bg-transparent mx-4 outline outline-1 outline-black">
                            ✅
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Confirmer l&apos;action</DialogTitle>
                            <DialogDescription>
                              cette action confirmera que le changement est
                              terminé
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() =>
                                setOpenDialogs(
                                  openDialogs.map((open, i) =>
                                    i === index ? false : open
                                  )
                                )
                              }
                            >
                              Annuler
                            </Button>
                            <Button onClick={() => handleConfirm(index)}>
                              marquer comme terminé
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-center">
              {/* Row 1: Réf Actuel */}
              <tr className="bg-gray-100">
                <td className="w-[150px] p-0 border-0  font-semibold">
                  Réf Actuel
                </td>
                {Array.from({ length: 8 }, (_, index) => (
                  <React.Fragment key={index}>
                    <td className="w-[180px] mx-auto border flex justify-center">
                      <HoverCard>
                        <HoverCardTrigger className="w-full">
                          <Select
                            value={cabStates[index].RefActuel}
                            disabled={!isLoggedIn}
                            onValueChange={(value) => {
                              const selectedRef = DATA.find(
                                (ref) => ref.ref === value
                              )
                              if (selectedRef) {
                                const newCabStates = cabStates.map(
                                  (state, i) => {
                                    if (i === index) {
                                      return {
                                        ...state,
                                        RefActuel: selectedRef.ref,
                                        PeintureActuel: selectedRef.refPeinture,
                                      }
                                    }
                                    return state
                                  }
                                )
                                setCabStates(newCabStates)
                              }
                            }}
                          >
                            <SelectTrigger
                              className="w-full border-none rounded-none py-1 h-auto"
                              style={{ width: "100%" }}
                            >
                              <SelectValue placeholder="Réf" />
                            </SelectTrigger>
                            <SelectContent style={{ width: "100%" }}>
                              <SelectGroup>
                                <SelectLabel>Réf</SelectLabel>
                                {DATA.map((ref) => (
                                  <SelectItem
                                    key={ref.ref}
                                    value={ref.ref}
                                    onChange={() => {
                                      const newCabStates = [...cabStates]
                                      newCabStates[index].RefActuel = ref.ref
                                      newCabStates[index].PeintureActuel =
                                        ref.refPeinture
                                      setCabStates(newCabStates)
                                    }}
                                  >
                                    {ref.ref}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-auto">
                          <div>
                            <p>{cabStates[index].RefActuel}</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </td>
                    <td
                      className="px-0 border bg-blue-400 text-white align-middle"
                      rowSpan={4}
                    >
                      <div className="flex items-center justify-center h-full w-6 mx-auto">
                        <Select
                          disabled={!isLoggedIn}
                          value={cabStates[index].Time} // Set the value prop to the current Time value
                          onValueChange={(value) => {
                            const newCabStates = cabStates.map((state, i) => {
                              if (i === index) {
                                return {
                                  ...state,
                                  Time: value,
                                }
                              }
                              return state
                            })
                            setCabStates(newCabStates)
                          }}
                        >
                          <SelectTrigger
                            className="p-1 text-black font-bold border-transparent hover:border hover:border-gray-100 flex flex-col h-16"
                            showIcon={false}
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.14645 6.85355C7.34171 7.04882 7.65829 7.04882 7.85355 6.85355L11.8536 2.85355C12.0488 2.65829 12.0488 2.34171 11.8536 2.14645C11.6583 1.95118 11.3417 1.95118 11.1464 2.14645L7.5 5.79289L3.85355 2.14645ZM3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L7.5 11.7929L3.85355 8.14645Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                className="text-gray-600"
                              ></path>
                            </svg>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="None">&nbsp;</SelectItem>
                              <SelectItem value="AM">AM</SelectItem>
                              <SelectItem value="M">M</SelectItem>
                              <SelectItem value="N">N</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </React.Fragment>
                ))}
              </tr>

              {/* Row 2: Peinture Actuel */}
              <tr>
                <td className="border font-semibold">Peinture Actuel</td>
                {cabStates.slice(0, 8).map((state, index) => (
                  <td
                    key={index}
                    className="border max-w-[120px] overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    <HoverCard>
                      <HoverCardTrigger>
                        <span>{state.PeintureActuel}</span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <span className="whitespace-normal">
                          {state.PeintureActuel}
                        </span>
                      </HoverCardContent>
                    </HoverCard>
                  </td>
                ))}
              </tr>

              {/* Row 3: Changement */}
              <tr className="bg-gray-100">
                <td className="w-[190px] p-0 border-0  font-semibold">
                  Changement
                </td>
                {Array.from({ length: 8 }, (_, index) => (
                  <React.Fragment key={index}>
                    <td
                      className={`max-w-[120px] font-semibold ${
                        from === "planification" &&
                        cabStates[index].ChangementStatus === "pending"
                          ? "bg-red-400"
                          : ""
                      } ${
                        cabStates[index].ChangementStatus === "done"
                          ? "bg-green-400"
                          : ""
                      }`}
                    >
                      <HoverCard>
                        <HoverCardTrigger className="w-full">
                          <Select
                            value={cabStates[index].Changement}
                            disabled={!isLoggedIn}
                            onValueChange={(value) => {
                              const selectedRef = DATA.find(
                                (ref) => ref.ref === value
                              )
                              if (selectedRef) {
                                const newCabStates = cabStates.map(
                                  (state, i) => {
                                    if (i === index) {
                                      return {
                                        ...state,
                                        Changement: selectedRef.ref,
                                        PeintureApresChangement:
                                          selectedRef.refPeinture,
                                        ChangementStatus:
                                          value && value.length > 1
                                            ? "pending"
                                            : state.ChangementStatus,
                                      }
                                    }
                                    return state
                                  }
                                )
                                setCabStates(newCabStates)
                              }
                            }}
                          >
                            <SelectTrigger className="w-full border-none rounded-none p-1 h-auto">
                              <SelectValue placeholder="Réf" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Réf</SelectLabel>
                                {DATA.map((ref) => (
                                  <SelectItem key={ref.ref} value={ref.ref}>
                                    {ref.ref}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-auto">
                          <div>
                            <p>{cabStates[index].Changement}</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </td>
                  </React.Fragment>
                ))}
              </tr>

              {/* Row 4: Peinture Après chang */}
              <tr>
                <td className="font-semibold">Peinture Après chang</td>
                {cabStates.slice(0, 8).map((state, index) => (
                  <td
                    key={index}
                    className={`border max-w-[120px] overflow-hidden whitespace-nowrap text-ellipsis  ${
                      from === "planification" &&
                      cabStates[index].ChangementStatus === "pending"
                        ? "bg-red-400"
                        : ""
                    } ${
                      cabStates[index].ChangementStatus === "done" &&
                      "bg-green-400"
                    }
                    `}
                  >
                    <HoverCard>
                      <HoverCardTrigger>
                        <span>{state.PeintureApresChangement}</span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <span>{state.PeintureApresChangement}</span>
                      </HoverCardContent>
                    </HoverCard>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-1"></div>
      {/*****************************************   AMC 9 -> 16    *************************************/}
      <div className="h-1"></div>

      <div className="flex items-center justify-center  bg-gray-100 w-full px-1 rounded-lg">
        <div className="overflow-x-auto w-full rounded-lg">
          <table className="w-full border border-gray-300 shadow-lg rounded-lg bg-white ">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-400 text-white text-center">
                <th></th>
                {[...Array(8)].map((_, index) => (
                  <th
                    key={index}
                    colSpan={2}
                    className="text-black w-[100px]"
                    id={`CAB-A0${index + 8}`}
                  >
                    CAB-A0{index + 9}
                    {(session?.user.role === "VERIFIEDUSER" ||
                      session?.user.role === "ADMIN") && (
                      <Dialog
                        open={openDialogs[index + 8]}
                        onOpenChange={(isOpen) =>
                          setOpenDialogs(
                            openDialogs.map((open, i) =>
                              i === index + 8 ? isOpen : open
                            )
                          )
                        }
                      >
                        <DialogTrigger asChild>
                          <Button className="p-0 h-auto bg-transparent mx-4 outline outline-1 outline-black">
                            ✅
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Confirmer l&apos;action</DialogTitle>
                            <DialogDescription>
                              cette action confirmera que le changement est
                              terminé
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() =>
                                setOpenDialogs(
                                  openDialogs.map((open, i) =>
                                    i === index + 8 ? false : open
                                  )
                                )
                              }
                            >
                              Annuler
                            </Button>
                            <Button onClick={() => handleConfirm(index + 8)}>
                              marquer comme terminé
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-center">
              {/* Row 1: Réf Actuel */}
              <tr className="bg-gray-100">
                <td className="w-[190px] p-0 border-0  font-semibold">
                  Réf Actuel
                </td>
                {Array.from({ length: 8 }, (_, index) => (
                  <React.Fragment key={index}>
                    <td className="w-[180px] mx-auto border flex justify-center">
                      <HoverCard>
                        <HoverCardTrigger className="w-full">
                          <Select
                            value={cabStates[index + 8].RefActuel}
                            disabled={!isLoggedIn}
                            onValueChange={(value) => {
                              const selectedRef = DATA.find(
                                (ref) => ref.ref === value
                              )
                              if (selectedRef) {
                                const newCabStates = cabStates.map(
                                  (state, i) => {
                                    if (i === index + 8) {
                                      return {
                                        ...state,
                                        RefActuel: selectedRef.ref,
                                        PeintureActuel: selectedRef.refPeinture,
                                      }
                                    }
                                    return state
                                  }
                                )
                                setCabStates(newCabStates)
                              }
                            }}
                          >
                            <SelectTrigger className="w-full border-none rounded-none p-1 h-auto">
                              <SelectValue placeholder="Réf" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Réf</SelectLabel>
                                {DATA.map((ref) => (
                                  <SelectItem
                                    key={ref.ref}
                                    value={ref.ref}
                                    onChange={() => {
                                      const newCabStates = [...cabStates]
                                      newCabStates[index + 8].RefActuel =
                                        ref.ref
                                      newCabStates[index + 8].PeintureActuel =
                                        ref.refPeinture
                                      setCabStates(newCabStates)
                                    }}
                                  >
                                    {ref.ref}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-auto">
                          <div>
                            <p>{cabStates[index + 8].RefActuel}</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </td>
                    <td
                      className="px-0 border bg-blue-400 text-white align-middle"
                      rowSpan={4}
                    >
                      <div className="flex items-center justify-center h-full w-6 mx-auto">
                        <Select
                          disabled={!isLoggedIn}
                          value={cabStates[index + 8].Time} // Set the value prop to the current Time value
                          onValueChange={(value) => {
                            const newCabStates = cabStates.map((state, i) => {
                              if (i === index + 8) {
                                return {
                                  ...state,
                                  Time: value,
                                }
                              }
                              return state
                            })
                            setCabStates(newCabStates)
                          }}
                        >
                          <SelectTrigger
                            className="p-1 text-black font-bold border-transparent hover:border hover:border-gray-100 flex flex-col h-16"
                            showIcon={false}
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.14645 6.85355C7.34171 7.04882 7.65829 7.04882 7.85355 6.85355L11.8536 2.85355C12.0488 2.65829 12.0488 2.34171 11.8536 2.14645C11.6583 1.95118 11.3417 1.95118 11.1464 2.14645L7.5 5.79289L3.85355 2.14645ZM3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L7.5 11.7929L3.85355 8.14645Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                className="text-gray-600"
                              ></path>
                            </svg>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="None">&nbsp;</SelectItem>
                              <SelectItem value="AM">AM</SelectItem>
                              <SelectItem value="M">M</SelectItem>
                              <SelectItem value="N">N</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </React.Fragment>
                ))}
              </tr>

              {/* Row 2: Peinture Actuel */}
              <tr>
                <td className="font-semibold">Peinture Actuel</td>
                {cabStates.slice(8, 16).map((state, index) => (
                  <td
                    key={index}
                    className="border max-w-[120px] overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    <HoverCard>
                      <HoverCardTrigger>
                        <span>{state.PeintureActuel}</span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <span>{state.PeintureActuel}</span>
                      </HoverCardContent>
                    </HoverCard>
                  </td>
                ))}
              </tr>

              {/* Row 3: Changement */}
              <tr className="bg-gray-100">
                <td className="font-semibold">Changement</td>
                {Array.from({ length: 8 }, (_, index) => (
                  <React.Fragment key={index}>
                    <td
                      className={`max-w-[120px] font-semibold ${
                        from === "planification" &&
                        cabStates[index + 8].ChangementStatus === "pending"
                          ? "bg-red-400"
                          : ""
                      } ${
                        cabStates[index + 8].ChangementStatus === "done"
                          ? "bg-green-400"
                          : ""
                      }`}
                    >
                      <HoverCard>
                        <HoverCardTrigger className="w-full">
                          <Select
                            value={cabStates[index + 8].Changement}
                            disabled={!isLoggedIn}
                            onValueChange={(value) => {
                              const selectedRef = DATA.find(
                                (ref) => ref.ref === value
                              )
                              if (selectedRef) {
                                const newCabStates = cabStates.map(
                                  (state, i) => {
                                    if (i === index + 8) {
                                      return {
                                        ...state,
                                        Changement: selectedRef.ref,
                                        PeintureApresChangement:
                                          selectedRef.refPeinture,
                                        ChangementStatus:
                                          value && value.length > 1
                                            ? "pending"
                                            : state.ChangementStatus,
                                      }
                                    }
                                    return state
                                  }
                                )
                                setCabStates(newCabStates)
                              }
                            }}
                          >
                            <SelectTrigger className="w-full border-none rounded-none p-1 h-auto">
                              <SelectValue placeholder="Réf" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Réf</SelectLabel>
                                {DATA.map((ref) => (
                                  <SelectItem key={ref.ref} value={ref.ref}>
                                    {ref.ref}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-auto">
                          <div>
                            <p>{cabStates[index + 8].Changement}</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </td>
                  </React.Fragment>
                ))}
              </tr>

              {/* Row 4: Peinture Après chang */}
              <tr>
                <td className="font-semibold">Peinture Après chang</td>
                {cabStates.slice(8, 16).map((state, index) => (
                  <td
                    key={index}
                    className={`border max-w-[120px] overflow-hidden whitespace-nowrap text-ellipsis  ${
                      from === "planification" &&
                      cabStates[index + 8].ChangementStatus === "pending"
                        ? "bg-red-400"
                        : ""
                    } ${
                      cabStates[index + 8].ChangementStatus === "done" &&
                      "bg-green-400"
                    }
                    `}
                  >
                    <HoverCard>
                      <HoverCardTrigger>
                        <span>{state.PeintureApresChangement}</span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <span>{state.PeintureApresChangement}</span>
                      </HoverCardContent>
                    </HoverCard>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  )
}
