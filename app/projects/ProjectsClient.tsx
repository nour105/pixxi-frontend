"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PropertyCard from "../components/home/ProjectCard";
import { getProperties } from "../lib/api"; // your API function

interface Project {
  id: string;
  name: string;
  developerName: string;
  imageUrl: string;
  location?: string;
}

export default function ProjectsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 12;

  // Get initial page from URL
  useEffect(() => {
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    setPage(pageParam);
  }, [searchParams]);

  // Fetch projects whenever page changes
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await getProperties({ page, perPage });
        setProjects(res?.data?.list || []);
        const total = res?.data?.totalSize || 1;
        setTotalPages(Math.ceil(total / perPage));
      } catch (err) {
        console.error("Failed to fetch properties", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    // Update the URL query
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.replace(`/projects?${params.toString()}`);
  }, [page, router]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">All Projects</h1>
      <p className="text-gray-500 mb-12">
        Browse all off-plan and ready projects in Uae
      </p>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: perPage }).map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">No projects found.</p>
      ) : (
        <>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {projects.map((prop: any) => (
                   <PropertyCard key={prop.id} property={prop} />
                 ))}
               </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg border ${
                  page === 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-blue-600 border-blue-600 hover:bg-blue-50"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg border ${
                  page === totalPages
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-blue-600 border-blue-600 hover:bg-blue-50"
                }`}
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