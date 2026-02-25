"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectsByCity } from "../../lib/api";
import ProjectCard from "../../components/home/ProjectCard";

// slug → real city name
const CITY_MAP: Record<string, string> = {
  dubai: "Dubai",
  "abu-dhabi": "Abu Dhabi",
  sharjah: "Sharjah",
  "ras-al-khaimah": "Ras Al Khaimah",
};

export default function CityProjectsPage() {
  const params = useParams();
  const citySlug = params.city as string;

  const cityName = CITY_MAP[citySlug];

const [projects, setProjects] = useState<any[]>([]);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [loading, setLoading] = useState(false);

const PAGE_SIZE = 12;

useEffect(() => {
  if (!cityName) return;

  setLoading(true);

  getProjectsByCity(cityName)
    .then((res) => {
      const list = res.data.list || [];

      const filtered = list.filter(
        (p: any) => p.cityName === cityName
      );

      setProjects(
        filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
      );

      setTotalPages(
        Math.ceil(filtered.length / PAGE_SIZE)
      );
    })
    .finally(() => setLoading(false));
}, [cityName, page]);





  if (!cityName) {
    return <p className="p-10">City not found</p>;
  }

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-2">
        Projects in {cityName}
      </h2>

      <p className="text-gray-500 mb-8">
        Explore all off-plan properties in {cityName}.
      </p>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found in {cityName}.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} property={project} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            <span className="text-sm">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}