/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { client } from "@/zazzau-e-library/client";
import { PortableText } from "@portabletext/react";
import { portableComponents } from "@/app/component/shared/portableText";

interface Emir {
  _id: string;
  name: string;
  slug: string;
  portrait?: { asset: { url: string } };
  reignStart?: number;
  reignEnd?: number;
  bio?: any[];
}

export default function EmirDetailsPage() {
  const [emir, setEmir] = useState<Emir | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchEmir = async () => {
      if (!slug) return;
      try {
        const query = `*[_type=="emir" && slug.current == $slug][0]{
          _id,
          name,
          slug,
          portrait{asset->{url}},
          reignStart,
          reignEnd,
          bio
        }`;
        const data = await client.fetch(query, { slug });
        setEmir(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmir();
  }, [slug]);

  if (loading) return <div className="text-center py-16">Loading Emir...</div>;
  if (!emir) return <div className="text-center py-16">Emir not found</div>;

  return (
    <div className="mx-auto lg:w-9/12 py-16 px-5">
      <div className="flex flex-col md:flex-row gap-6">
        {emir.portrait?.asset.url && (
          <Image
            src={emir.portrait.asset.url}
            alt={emir.name}
            width={300}
            height={400}
            className="rounded-lg object-cover"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{emir.name}</h1>
          <p className="text-gray-600 mb-4">
            Reign: {emir.reignStart} – {emir.reignEnd || "Present"}
          </p>
        </div>
      </div>

      {emir.bio && (
        <div className="mt-8 prose prose-lg">
          <PortableText value={emir.bio} components={portableComponents} />
        </div>
      )}
    </div>
  );
}
