import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-6">Welcome to Autoliv</h1>
          <p className="text-xl mb-8">
            Your trusted source for high-quality car parts. Enhance your
            vehicle&apos;s performance and safety with our premium components.
          </p>
          <Button size="lg">Explore Our Products</Button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Car parts showcase"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Why Choose Autoliv?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
            <p>All our parts meet or exceed OEM specifications</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p>Find parts for all major car brands and models</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
            <p>Our team is here to help you find the right parts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
