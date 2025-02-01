import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Reference = {
  id: number;
  ref: string;
  refPeinture: string;
};
type CabState = {
  RefActuel: string;
  PeintureActuel: string;
  Changement: string;
  PeintureApresChangement: string;
  Time: string;
};

export default function Table({
  AMC,
  DATA,
}: {
  AMC: string;
  DATA: Reference[];
}) {
  const initialCabState: CabState = {
    RefActuel: "",
    PeintureActuel: "",
    Changement: "",
    PeintureApresChangement: "",
    Time: "",
  };
  const [cabStates, setCabStates] = useState<CabState[]>(
    Array(16).fill(initialCabState)
  );

  return (
    <>
      {/**************************************    AMC 1 -> 8   ***************************************/}
      <div className="flex items-center justify-center  bg-gray-100 w-full px-1 rounded-lg">
        <div className="overflow-x-auto w-full rounded-lg">
          <table className="w-full border border-gray-300 shadow-lg rounded-lg bg-white ">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-400 text-white text-center">
                <th className="px-3 border"></th>
                {[...Array(8)].map((_, index) => (
                  <th
                    key={index}
                    colSpan={2}
                    className="px-3 border text-black"
                    id={`CAB-A0${index + 1}`}
                  >
                    CAB-A0{index + 1}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-center">
              {/* Row 1: Réf Actuel */}
              <tr className="bg-gray-100">
                <td className="px-3 border font-semibold">Réf Actuel</td>
                {Array.from({ length: 8 }, (_, index) => (
                  <React.Fragment key={index}>
                    <td className="px-1 border flex justify-center">
                      <Select
                        onValueChange={(value) => {
                          const selectedRef = DATA.find(
                            (ref) => ref.ref === value
                          );
                          if (selectedRef) {
                            const newCabStates = cabStates.map((state, i) => {
                              if (i === index) {
                                return {
                                  ...state,
                                  RefActuel: selectedRef.ref,
                                  PeintureActuel: selectedRef.refPeinture,
                                };
                              }
                              return state;
                            });
                            console.log(cabStates);
                            setCabStates(newCabStates);
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
                                  console.log("changed");
                                  const newCabStates = [...cabStates];
                                  newCabStates[index].RefActuel = ref.ref;
                                  newCabStates[index].PeintureActuel =
                                    ref.refPeinture;
                                  console.log(ref.refPeinture);
                                  setCabStates(newCabStates);
                                }}
                              >
                                {ref.ref}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </td>
                    <td
                      className="px-1 border bg-blue-400 text-white align-middle"
                      rowSpan={4}
                    >
                      <div className="flex items-center justify-center h-full">
                        <Select
                          onValueChange={(value) => {
                            const newCabStates = [...cabStates];
                            newCabStates[index].Time = value;
                            setCabStates(newCabStates);
                            console.log(cabStates);
                          }}
                        >
                          <SelectTrigger className="p-1 text-black font-bold border-transparent hover:border hover:border-gray-100">
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
                <td className="px-3 border font-semibold">Peinture Actuel</td>
                <td className="px-3 border">{cabStates[0].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[1].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[2].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[3].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[4].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[5].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[6].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[7].PeintureActuel}</td>
              </tr>

              {/* Row 3: Changement */}
              <tr className="bg-gray-100">
                <td className="px-3 border font-semibold">Changement</td>
                <td className="px-3 border">
                  <Select>
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
                </td>
                <td className="px-3 border">
                  <Select>
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
                </td>
                <td className="px-3 border">
                  <Select>
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
                </td>
                <td className="px-3 border">
                  <Select>
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
                </td>
                <td className="px-3 border">
                  <Select>
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
                </td>
                <td className="px-3 border">
                  <Select>
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
                </td>
                <td className="px-3 border">
                  <Select>
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
                </td>
                <td className="px-3 border">
                  <Select>
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
                </td>
              </tr>

              {/* Row 4: Peinture Après chang */}
              <tr>
                <td className="px-3 border font-semibold">
                  Peinture Après chang
                </td>
                <td className="px-3 border">1 PEIN CH {AMC}</td>
                <td className="px-3 border">2 PEIN CH {AMC}</td>
                <td className="px-3 border">3 PEIN CH {AMC}</td>
                <td className="px-3 border">4 PEIN CH {AMC}</td>
                <td className="px-3 border">5 PEIN CH {AMC}</td>
                <td className="px-3 border">6 PEIN CH {AMC}</td>
                <td className="px-3 border">7 PEIN CH {AMC}</td>
                <td className="px-3 border">8 PEIN CH {AMC}</td>
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
                <th className="px-3 border"></th>
                {[...Array(8)].map((_, index) => (
                  <th
                    key={index}
                    colSpan={2}
                    className="px-3 border text-black"
                    id={`CAB-A0${index + 9}`}
                  >
                    CAB-A0{index + 9}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-center">
              {/* Row 1: Réf Actuel */}
              <tr className="bg-gray-100">
                <td className="px-3 border font-semibold">Réf Actuel</td>
                <td className="px-3 border">9 REF ACT {AMC}</td>
                <td
                  className="px-3 border bg-blue-500 text-white align-middle"
                  rowSpan={4}
                >
                  <div className="flex items-center justify-center h-full">
                    T9
                  </div>
                </td>
                <td className="px-3 border">10 REF ACT {AMC}</td>
                <td
                  className="px-3 border bg-blue-500 text-white align-middle"
                  rowSpan={4}
                >
                  <div className="flex items-center justify-center h-full">
                    T10
                  </div>
                </td>
                <td className="px-3 border">11 REF ACT {AMC}</td>
                <td
                  className="px-3 border bg-blue-500 text-white align-middle"
                  rowSpan={4}
                >
                  <div className="flex items-center justify-center h-full">
                    T11
                  </div>
                </td>
                <td className="px-3 border">12 REF ACT {AMC}</td>
                <td
                  className="px-3 border bg-blue-500 text-white align-middle"
                  rowSpan={4}
                >
                  <div className="flex items-center justify-center h-full">
                    T12
                  </div>
                </td>
                <td className="px-3 border">13 REF ACT {AMC}</td>
                <td
                  className="px-3 border bg-blue-500 text-white align-middle"
                  rowSpan={4}
                >
                  <div className="flex items-center justify-center h-full">
                    T13
                  </div>
                </td>
                <td className="px-3 border">14 REF ACT {AMC}</td>
                <td
                  className="px-3 border bg-blue-500 text-white align-middle"
                  rowSpan={4}
                >
                  <div className="flex items-center justify-center h-full">
                    T14
                  </div>
                </td>
                <td className="px-3 border">15 REF ACT {AMC}</td>
                <td
                  className="px-3 border bg-blue-500 text-white align-middle"
                  rowSpan={4}
                >
                  <div className="flex items-center justify-center h-full">
                    T15
                  </div>
                </td>
                <td className="px-3 border">16 REF ACT {AMC}</td>
                <td
                  className="px-3 border bg-blue-500 text-white align-middle"
                  rowSpan={4}
                >
                  <div className="flex items-center justify-center h-full">
                    T6
                  </div>
                </td>
              </tr>

              {/* Row 2: Peinture Actuel */}
              <tr>
                <td className="px-3 border font-semibold">Peinture Actuel</td>
                <td className="px-3 border">9 PEIN {AMC}</td>
                <td className="px-3 border">10 PEIN {AMC}</td>
                <td className="px-3 border">11 PEIN {AMC}</td>
                <td className="px-3 border">12 PEIN {AMC}</td>
                <td className="px-3 border">13 PEIN {AMC}</td>
                <td className="px-3 border">14 PEIN {AMC}</td>
                <td className="px-3 border">15 PEIN {AMC}</td>
                <td className="px-3 border">16 PEIN {AMC}</td>
              </tr>

              {/* Row 3: Changement */}
              <tr className="bg-gray-100">
                <td className="px-3 border font-semibold">Changement</td>
                <td className="px-3 border">9 CH {AMC}</td>
                <td className="px-3 border">10 CH {AMC}</td>
                <td className="px-3 border">11 CH {AMC}</td>
                <td className="px-3 border">12 CH {AMC}</td>
                <td className="px-3 border">13 CH {AMC}</td>
                <td className="px-3 border">14 CH {AMC}</td>
                <td className="px-3 border">15 CH {AMC}</td>
                <td className="px-3 border">16 CH {AMC}</td>
              </tr>

              {/* Row 4: Peinture Après chang */}
              <tr>
                <td className="px-3 border font-semibold">
                  Peinture Après chang
                </td>
                <td className="px-3 border">9 PEIN CH {AMC}</td>
                <td className="px-3 border">10 PEIN CH {AMC}</td>
                <td className="px-3 border">11 PEIN CH {AMC}</td>
                <td className="px-3 border">12 PEIN CH {AMC}</td>
                <td className="px-3 border">13 PEIN CH {AMC}</td>
                <td className="px-3 border">14 PEIN CH {AMC}</td>
                <td className="px-3 border">15 PEIN CH {AMC}</td>
                <td className="px-3 border">16 PEIN CH {AMC}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
