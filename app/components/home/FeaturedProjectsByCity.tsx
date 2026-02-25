"use client";

import { useEffect, useState } from "react";
import { getProjectsByCity } from "../../lib/api";
import ProjectCard from "./ProjectCard";

const CITIES = [
  { label: "Dubai", value: "Dubai" },
  { label: "Abu Dhabi", value: "Abu Dhabi" },
  { label: "Sharjah", value: "Sharjah" },
  { label: "Ras Al Khaimah", value: "Ras Al Khaimah" },
];

// normalize helper
const normalize = (value: string) =>
  value?.toLowerCase().replace(/\s+/g, "");

export default function FeaturedProjectsByCity() {
  const [city, setCity] = useState("Dubai");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getProjectsByCity("", 1, 50)
      .then((res) => {
        const list = res.data?.list || [];

        const filtered = list.filter((p: any) =>
          normalize(p.cityName) === normalize(city)
        );

        setProjects(filtered.slice(0, 4));
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-2">
        Explore new projects in the UAE
      </h2>
      <p className="text-gray-500 mb-8">
        Discover the latest off-plan properties and be informed.
      </p>

      {/* City Tabs */}
      <div className="flex gap-6 border-b mb-10 overflow-x-auto">
        {CITIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCity(c.value)}
            className={`pb-3 text-sm font-semibold whitespace-nowrap ${
              city === c.value
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found for {city}.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((item) => (
              <ProjectCard key={item.id} property={item} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href={`/see-projects/${city
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              See all projects
            </a>
          </div>
        </>
      )}
    </section>
  );
}
