"use client";

import { useEffect, useState } from "react";
import { getDevelopers } from "../lib/api";
import Link from "next/link";
import Image from "next/image";

interface Developer {
  id: string;
  name: string;
  logoUrl: string;
  projectsCount?: number;
}

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    const fetchDevelopers = async () => {
      setLoading(true);
      try {
        const res = await getDevelopers();
        setDevelopers(res?.data?.list || []);
      } catch (err) {
        console.error("Failed to fetch developers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  // Pagination slice
  const totalPages = Math.ceil(developers.length / perPage);
  const paginatedDevelopers = developers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">Developers</h1>
      <p className="text-gray-500 mb-12">
        Browse all top developers in the UAE and see their projects
      </p>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: perPage }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : developers.length === 0 ? (
        <p className="text-gray-500">No developers found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {paginatedDevelopers.map((dev) => (
              <Link
                key={dev.id}
                href={`/developers/${encodeURIComponent(dev.name)}/projects`}
                className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition flex flex-col items-center"
              >
                <div className="relative h-24 w-full mb-4">
                  <Image
                    src={dev.logoUrl || "/fallback-logo.png"}
                    alt={dev.name}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 transition"
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-900">
                  {dev.name}
                </h3>
                {dev.projectsCount !== undefined && (
                  <p className="mt-1 text-sm text-gray-500">
                    {dev.projectsCount} projects
                  </p>
                )}
              </Link>
            ))}
          </div>

          {/* Pagination */}
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