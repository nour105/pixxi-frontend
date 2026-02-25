"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { getDeveloperProperties } from "../../../lib/api";
import PropertyCard from "../../../components/home/ProjectCard";

const PAGE_SIZE = 6;

export default function DeveloperProjectsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const developerName = params.name as string;
  const page = Number(searchParams.get("page")) || 1;

  // ✅ مهم: page داخل الـ key
  const { data, isLoading } = useSWR(
    developerName
      ? [`developer-projects`, developerName, page]
      : null,
    () => getDeveloperProperties(developerName, page, PAGE_SIZE),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const properties = data?.data?.list ?? [];
  const totalSize = data?.data?.totalSize ?? 0;
  const totalPages = Math.ceil(totalSize / PAGE_SIZE);

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {developerName} Projects
      </h1>

      {/* loading فقط أول مرة */}
      {isLoading && properties.length === 0 && (
        <p className="text-center py-10">Loading projects...</p>
      )}

      {!isLoading && properties.length === 0 && (
        <p className="text-center py-10">No projects found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((prop: any) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;

            if (
              p === 1 ||
              p === totalPages ||
              Math.abs(p - page) <= 1
            ) {
              return (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`px-4 py-2 border rounded ${
                    p === page
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              );
            }

            return null;
          })}

          <button
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}