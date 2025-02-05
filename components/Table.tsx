import React, { useEffect, useState } from "react";
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

  /******************* DEBUG ******************/
  useEffect(() => {
    console.log(cabStates);
  }, [cabStates]);
  /******************* DEBUG ******************/

  return (
    <React.Fragment key={AMC}>
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
                                  const newCabStates = [...cabStates];
                                  newCabStates[index].RefActuel = ref.ref;
                                  newCabStates[index].PeintureActuel =
                                    ref.refPeinture;
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
                            const newCabStates = cabStates.map((state, i) => {
                              if (i === index) {
                                return {
                                  ...state,
                                  Time: value,
                                };
                              }
                              return state;
                            });
                            setCabStates(newCabStates);
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
                {Array.from({ length: 8 }, (_, index) => (
                  <React.Fragment key={index}>
                    <td className="px-3 border">
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
                                  Changement: selectedRef.ref,
                                  PeintureApresChangement:
                                    selectedRef.refPeinture,
                                };
                              }
                              return state;
                            });
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
                              <SelectItem key={ref.ref} value={ref.ref}>
                                {ref.ref}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </td>
                  </React.Fragment>
                ))}
              </tr>

              {/* Row 4: Peinture Après chang */}
              <tr>
                <td className="px-3 border font-semibold">
                  Peinture Après chang
                </td>
                <td className="px-3 border">
                  {cabStates[0].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[1].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[2].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[3].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[4].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[5].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[6].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[7].PeintureApresChangement}
                </td>
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
                              if (i === index + 8) {
                                return {
                                  ...state,
                                  RefActuel: selectedRef.ref,
                                  PeintureActuel: selectedRef.refPeinture,
                                };
                              }
                              return state;
                            });
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
                                  const newCabStates = [...cabStates];
                                  newCabStates[index + 8].RefActuel = ref.ref;
                                  newCabStates[index + 8].PeintureActuel =
                                    ref.refPeinture;
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
                            const newCabStates = cabStates.map((state, i) => {
                              if (i === index + 8) {
                                return {
                                  ...state,
                                  Time: value,
                                };
                              }
                              return state;
                            });
                            setCabStates(newCabStates);
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
                <td className="px-3 border">{cabStates[8].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[9].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[10].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[11].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[12].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[13].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[14].PeintureActuel}</td>
                <td className="px-3 border">{cabStates[15].PeintureActuel}</td>
              </tr>

              {/* Row 3: Changement */}
              <tr className="bg-gray-100">
                <td className="px-3 border font-semibold">Changement</td>
                {Array.from({ length: 8 }, (_, index) => (
                  <React.Fragment key={index}>
                    <td className="px-3 border">
                      <Select
                        onValueChange={(value) => {
                          const selectedRef = DATA.find(
                            (ref) => ref.ref === value
                          );
                          if (selectedRef) {
                            const newCabStates = cabStates.map((state, i) => {
                              if (i === index + 8) {
                                return {
                                  ...state,
                                  Changement: selectedRef.ref,
                                  PeintureApresChangement:
                                    selectedRef.refPeinture,
                                };
                              }
                              return state;
                            });
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
                              <SelectItem key={ref.ref} value={ref.ref}>
                                {ref.ref}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </td>
                  </React.Fragment>
                ))}
              </tr>

              {/* Row 4: Peinture Après chang */}
              <tr>
                <td className="px-3 border font-semibold">
                  Peinture Après chang
                </td>
                <td className="px-3 border">
                  {cabStates[8].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[9].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[10].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[11].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[12].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[13].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[14].PeintureApresChangement}
                </td>
                <td className="px-3 border">
                  {cabStates[15].PeintureApresChangement}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}
