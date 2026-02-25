"use client";

import ProjectCard from "../../components/home/ProjectCard";
import { getProjectsByCity } from "../../lib/api";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CITY_MAP: Record<string, string> = {
  dubai: "Dubai",
  "abu-dhabi": "Abu Dhabi",
  sharjah: "Sharjah",
  "ras-al-khaimah": "Ras Al Khaimah",
};

const PAGE_SIZE = 12;

export default function CityProjectsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const citySlug = params.city as string;
  const cityName = CITY_MAP[citySlug];

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchProjects = async () => {
      if (!cityName) return;
      setIsLoading(true);
      const res = await getProjectsByCity(cityName);
      const list = res.data.list || [];
      setProjects(list.filter((p: any) => p.cityName === cityName));
      setIsLoading(false);
    };

    fetchProjects();
  }, [cityName]);

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const paginatedList = projects.slice(
    (pageFromUrl - 1) * PAGE_SIZE,
    pageFromUrl * PAGE_SIZE
  );

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/see-projects/${citySlug}?${params.toString()}`);
  };

  if (!cityName) return <p className="p-10">City not found</p>;

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-2">Projects in {cityName}</h2>
      <p className="text-gray-500 mb-8">Explore all off-plan properties in {cityName}.</p>

      {isLoading ? (
        <p>Loading projects...</p>
      ) : paginatedList.length === 0 ? (
        <p>No projects found in {cityName}.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedList.map((project: any) => (
              <ProjectCard key={project.id} property={project} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                disabled={pageFromUrl === 1}
                onClick={() => changePage(pageFromUrl - 1)}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {pageFromUrl} of {totalPages}
              </span>

              <button
                disabled={pageFromUrl === totalPages}
                onClick={() => changePage(pageFromUrl + 1)}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}