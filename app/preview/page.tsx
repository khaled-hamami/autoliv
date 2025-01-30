"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const carParts = [
  {
    id: 1,
    name: "Brake Pads",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Oil Filter",
    price: 9.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Spark Plugs",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Air Filter",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Air Filter",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Air Filter",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Air Filter",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Air Filter",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function View() {
  const router = useRouter();
  useEffect(() => {
    // Add padding to the body when the component mounts
    document.body.style.paddingBottom = "4rem";

    // Remove padding when the component unmounts
    return () => {
      document.body.style.paddingBottom = "0";
    };
  }, []);

  return (
    <>
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6">View Our Car Parts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {carParts.map((part) => (
            <div
              key={part.id}
              className="border rounded-lg p-4 flex flex-col items-center"
            >
              <Image
                src={part.image || "/placeholder.svg"}
                alt={part.name}
                width={200}
                height={200}
                className="mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{part.name}</h2>
              <p className="text-lg font-bold mb-4">${part.price.toFixed(2)}</p>
              <Button>Add to Cart</Button>
            </div>
          ))}
        </div>
      </div>
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
