/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/zazzau-e-library/client";
import Link from "next/link";
import { portableComponents } from "@/app/component/shared/portableText";
import { PortableText } from "@portabletext/react";
import { useParams } from "next/navigation";

type Emir = {
  _id: string;
  name: string;
  slug: { current: string };
  portrait?: { asset: { url: string } };
  reignStart?: number;
  reignEnd?: number;
  bio?: any[];
};

const EmireDetailsPage = () => {
    const { slug } = useParams()
  const [emir, setEmir] = useState<Emir | null>(null);
  const [otherEmirs, setOtherEmirs] = useState<Emir[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmirs = async () => {
      setLoading(true);
      try {
        const query = `*[_type=="emir" && slug.current == $slug][0]`;
        const currentEmir: Emir = await client.fetch(query, { slug });

        const othersQuery = `*[_type=="emir" && slug.current != $slug] | order(reignStart desc)`;
        const otherList: Emir[] = await client.fetch(othersQuery, { slug });

        setEmir(currentEmir);
        setOtherEmirs(otherList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmirs();
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading Emir details...</p>;
  if (!emir) return <p className="text-center py-20">Emir not found.</p>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start gap-10 mb-16">
        {emir.portrait?.asset?.url && (
          <div className="w-full lg:w-1/3">
            <Image
              src={emir.portrait.asset.url}
              alt={emir.name}
              width={400}
              height={500}
              className="rounded-lg shadow-lg object-cover w-full"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-[#8B5E3C] mb-4">{emir.name}</h1>
          <p className="text-gray-700 mb-4">
            Reign: {emir.reignStart} – {emir.reignEnd || "Present"}
          </p>

          {emir.bio ? (
            <PortableText value={emir.bio} components={portableComponents} />
          ) : (
            <p className="text-gray-500">Biography not available.</p>
          )}
        </div>
      </div>

      {/* Other Emirs */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold text-[#8B5E3C] mb-6">Other Emirs</h2>
        {otherEmirs.length === 0 ? (
          <p className="text-gray-500">No other emirs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherEmirs.map((e) => (
              <Link
                key={e._id}
                href={`/emirs/${e.slug.current}`}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {e.portrait?.asset?.url && (
                  <Image
                    src={e.portrait.asset.url}
                    alt={e.name}
                    width={300}
                    height={400}
                    className="object-cover w-full h-56"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{e.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Reign: {e.reignStart} – {e.reignEnd || "Present"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmireDetailsPage;
