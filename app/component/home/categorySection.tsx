"use client";

import { useEffect, useState } from "react";
import { client } from "@/zazzau-e-library/client";

type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "category"] | order(title asc){
            _id,
            title,
            slug,
            description
          }`
        );
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading)
    return (
      <section className="py-10 bg-[#F3E9E0] text-center">
        <p className="text-[#8B5E3C]">Loading categories...</p>
      </section>
    );

  return (
    <section className="py-10 bg-[#F3E9E0]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold text-[#8B5E3C] mb-6">
          Explore by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <span key={index} className="px-4 py-2 bg-[#8B5E3C] text-white font-medium rounded-full cursor-pointer hover:bg-[#A67C5B] transition">
              {category.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
