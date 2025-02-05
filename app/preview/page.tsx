"use client";

import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Reference = {
  id: number;
  ref: string;
  refPeinture: string;
};

export default function View() {
  const router = useRouter();

  useEffect(() => {
    const fetchReferences = async () => {
      const response = await fetch("/api/getReferences");
      const data = await response.json();
      setReferences(data);
    };
    fetchReferences();

    // Add padding to the body when the component mounts
    document.body.style.paddingBottom = "4rem";

    // Remove padding when the component unmounts
    return () => {
      document.body.style.paddingBottom = "0";
    };
  }, []);
  const [references, setReferences] = useState<Reference[]>([]);
  return (
    <>
      <div className="w-full flex justify-evenly">
        <Card className="flex justify-center py-4 rounded-none">
          <CardTitle className="text-2xl vertical-text text-center">
            AMC A
          </CardTitle>
        </Card>
        <div className="w-full">
          <Table AMC="AMCA" DATA={references} />
        </div>
      </div>
      <div className="w-full h-4 bg-black"></div>
      <div className="w-full flex justify-evenly">
        <Card className="flex justify-center py-4 rounded-none">
          <CardTitle className="text-2xl vertical-text text-center">
            AMC B
          </CardTitle>
        </Card>
        <div className="w-full">
          <Table AMC="AMCB" DATA={references} />
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
          <Table AMC="AMCB" DATA={references} />
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t h-16">
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          <Button
            variant="outline"
            className="font-bold"
            onClick={() => router.push("addReference")}
          >
            Ajouter une Référence +
          </Button>
          <p className="text-sm text-gray-600">
            &copy; 2025 Autoliv. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
