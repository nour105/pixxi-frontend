"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { getProjectsByCity } from "../../lib/api";

const ProjectCard = dynamic(() => import("./ProjectCard"), {
  ssr: false,
  loading: () => (
    <div className="h-64 rounded-xl bg-gray-200 animate-pulse" />
  ),
});

const CITIES = [
  { label: "Dubai", value: "Dubai" },
  { label: "Abu Dhabi", value: "Abu Dhabi" },
  { label: "Sharjah", value: "Sharjah" },
  { label: "Ras Al Khaimah", value: "Ras Al Khaimah" },
];

const normalize = (value: string) =>
  value?.toLowerCase().replace(/\s+/g, "");

const fetcher = async () => {
  const res = await getProjectsByCity("", 1, 1000);
  return res?.data?.list || [];
};

export default function FeaturedProjectsByCity() {
  const [city, setCity] = useState("Dubai");

  const { data: allProjects = [], isLoading } = useSWR(
    "featured-projects",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10 * 60 * 1000,
    }
  );

  const projects = useMemo(() => {
    return allProjects
      .filter(
        (project: any) =>
          normalize(project.cityName) === normalize(city)
      )
      .slice(0, 4);
  }, [allProjects, city]);

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
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">No projects found for {city}.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((item: any) => (
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