/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { client } from "@/zazzau-e-library/client"; // Your Sanity client
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { portableComponents } from "./shared/portableText";

type Emir = {
  _id: string;
  slug: any;
  name: string;
  reignStart: number;
  reignEnd?: number | string;
  portrait?: { asset: { url: string } };
  bio?: any; // Portable Text array
};

export default function PastEmirsSection() {
  const [emirs, setEmirs] = useState<Emir[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmirs = async () => {
      setLoading(true);
      try {
        const query = `*[_type=="emir"] | order(reignStart desc){
          _id,
          name,
          slug,
          reignStart,
          reignEnd,
          portrait{asset->{url}},
          bio
        }`;
        const data: Emir[] = await client.fetch(query);
        setEmirs(data);
      } catch (error) {
        console.error("Error fetching emirs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmirs();
  }, []);

  if (loading)
    return <p className="text-center py-20 text-gray-600">Loading past emirs...</p>;

  if (!emirs || emirs.length === 0)
    return <p className="text-center py-20 text-gray-600">No past emirs found.</p>;

  return (
    <section className="py-20">
      <div className="max-w-[90%] mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#8B5E3C] mb-8 text-center">
          Emirs of Zazzau
        </h2>

        <Carousel className="w-full">
          <CarouselContent>
            {emirs.map((emir) => (
              <CarouselItem
                key={emir._id}
                className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-4"
              >
                <Card className="h-full bg-white shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden py-0">
                  {emir.portrait?.asset?.url && (
                    <div className="relative w-full h-56">
                      <Image
                        src={emir.portrait.asset.url}
                        alt={emir.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#8B5E3C]">
                      {emir.name}
                    </CardTitle>
                    <CardDescription>
                      {emir.reignStart} – {emir.reignEnd || "Present"}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4">
                    <Link
                      href={`/emir/${emir.slug.current}`}
                      className="text-sm text-blue-600 cursor-pointer"
                    >
                      View Profile →
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
