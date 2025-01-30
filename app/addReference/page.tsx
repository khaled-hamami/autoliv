"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Reference = {
  id: number;
  ref: string;
  refPeinture: string;
};
import { useEffect } from "react";

const addReference = async (ref: string, refPeinture: string) => {
  const response = await fetch("/api/addReference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ref, refPeinture }),
  });
  const data = await response.json();
  return data;
};

const deleteReference = async (id: number) => {
  const response = await fetch("/api/deleteReference/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  return data;
};

export default function References() {
  useEffect(() => {
    const fetchReferences = async () => {
      console.log("Fetching references from database");
      const response = await fetch("/api/getReferences");
      const data = await response.json();
      setReferences(data);
    };
    fetchReferences();
  }, []);

  const toast = useToast();
  const [references, setReferences] = useState<Reference[]>();
  const [newRef, setNewRef] = useState("");
  const [newRefPeinture, setNewRefPeinture] = useState("");
  const [selectedReference, setSelectedReference] = useState<Reference | null>(
    null
  );

  const handleAddReference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRef || !newRefPeinture) {
      toast.toast({
        variant: "destructive",
        title: "error",
        description: "Please fill out both fields",
      });
      return;
    }
    addReference(newRef, newRefPeinture).then((data) => {
      console.log("Added new reference:", data);
      toast.toast({
        title: "Success",
        description: "Reference added successfully",
      });
      setReferences([...(references || []), data]);
    });

    setNewRef("");
    setNewRefPeinture("");
  };

  const handleDeleteReference = (id: number) => {
    deleteReference(id).then((data) => {
      console.log("Deleted reference:", data);
      toast.toast({
        title: "Success",
        description: "Reference deleted successfully",
      });
      setReferences(references?.filter((ref) => ref.id !== id));
      setSelectedReference(null);
    });
    console.log("Deleting reference with id:", id);
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">References</h1>

      {/* Add new reference form */}
      <form onSubmit={handleAddReference} className="mb-8 space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="newRef">New Reference</Label>
            <Input
              id="newRef"
              value={newRef}
              onChange={(e) => setNewRef(e.target.value)}
              placeholder="Enter new reference"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="newRefPeinture">New Ref Peinture</Label>
            <Input
              id="newRefPeinture"
              value={newRefPeinture}
              onChange={(e) => setNewRefPeinture(e.target.value)}
              placeholder="Enter new ref peinture"
            />
          </div>
        </div>
        <Button type="submit">Add Reference</Button>
      </form>

      {/* Dropdown list */}
      <div className="space-y-4">
        <Select
          onValueChange={(value) =>
            setSelectedReference(
              references?.find((ref) => ref.id === Number.parseInt(value)) ||
                null
            )
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a reference" />
          </SelectTrigger>
          <SelectContent>
            {references?.map((ref) => (
              <SelectItem key={ref.id} value={ref.id.toString()}>
                {ref.ref} - {ref.refPeinture}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Display selected reference and delete button */}
        {selectedReference && (
          <div className="flex items-center justify-between p-4 border rounded">
            <div>
              <p>
                <strong>Ref:</strong> {selectedReference.ref}
              </p>
              <p>
                <strong>Ref Peinture:</strong> {selectedReference.refPeinture}
              </p>
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDeleteReference(selectedReference.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
