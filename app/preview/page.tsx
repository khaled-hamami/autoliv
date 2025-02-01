"use client";

import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
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
      console.log("Fetching references from database");
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
      <Table AMC="AMCA" DATA={references} />
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t h-16">
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("addReference")}
          >
            Add Reference
          </Button>
          <p className="text-sm text-gray-600">
            &copy; 2023 Autoliv. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
