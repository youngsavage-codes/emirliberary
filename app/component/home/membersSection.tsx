/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { client } from "@/zazzau-e-library/client";

// GROQ query to fetch all council members
const membersQuery = `*[_type == "councilMember"] | order(_createdAt desc) {
  _id,
  name,
  position,
  "img": image.asset->url,
  "alt": image.alt,
  about
}`;

const MembersSection = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch members client-side
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await client.fetch(membersQuery);
        setMembers(data);
      } catch (err) {
        console.error("Failed to fetch members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Split members into chunks for carousel slides
  const chunkMembers = (arr: any[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const lgChunkSize = 6; // 2 rows × 3 columns
  const memberChunks = chunkMembers(members, lgChunkSize);

  if (loading) {
    return (
      <section className="py-16 text-center">
        <p className="text-gray-600">Loading members...</p>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="lg:max-w-[90%] mx-auto px-5 lg:flex lg:gap-10">
        {/* Optional right-side image on large screens */}
        <div className="hidden lg:block lg:w-2/5 order-last">
          <Image
            src="/emirs.jpg"
            alt="Emirate Council"
            width={400}
            height={300}
            className="rounded-lg shadow-lg object-cover w-full"
          />
        </div>

        <div className="w-full">
          <h2 className="text-3xl font-bold text-[#8B5E3C] mb-10 text-center lg:text-left">
            Top Members of the Emirate Council
          </h2>

          <Carousel opts={{ align: "center" }} className="w-full">
            <CarouselContent className="w-full">
              {memberChunks.map((chunk, slideIdx) => (
                <CarouselItem key={slideIdx} className="w-full">
                  <div
                    className="grid gap-6
                      grid-cols-1 grid-rows-1 
                      md:grid-cols-2 md:grid-rows-2 
                      lg:grid-cols-3 lg:grid-rows-2"
                  >
                    {chunk.map((member: any) => (
                      <Card
                        key={member._id}
                        className="flex flex-col h-full hover:shadow-xl transition rounded-lg"
                      >
                        <CardContent className="flex flex-col h-full p-4">
                          <CardHeader className="p-0 mb-4">
                            <div className="w-32 h-32 mx-auto relative">
                              <Image
                                src={member.img}
                                alt={member.alt || member.name}
                                fill
                                className="rounded-full object-cover border-4 border-[#8B5E3C]"
                              />
                            </div>
                          </CardHeader>
                          <div className="flex-1 flex flex-col justify-between text-center">
                            <CardTitle className="text-xl font-semibold text-[#8B5E3C]">
                              {member.name}
                            </CardTitle>
                            <p className="text-gray-700 font-medium text-sm mt-1">
                              {member.position}
                            </p>
                            <CardDescription className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-3">
                              {member.about && member.about[0]?.children
                                ? member.about[0].children[0]?.text
                                : "—"}
                            </CardDescription>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
