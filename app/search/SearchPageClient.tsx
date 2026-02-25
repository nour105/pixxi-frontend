"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProjectCard from "../components/home/ProjectCard";

const PER_PAGE = 12;
const normalize = (val: any) => String(val || "").toLowerCase().trim();

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL params
  const keyword = normalize(searchParams.get("q"));
  const purpose = normalize(searchParams.get("purpose")).toUpperCase();
  const typeParam = normalize(searchParams.get("type")); // property type dropdown
  const bedroomsParam = normalize(searchParams.get("bedrooms")); // bedrooms dropdown
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  // state
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [loading, setLoading] = useState(false);

  // fetch all projects from API
  const fetchAllProjects = async () => {
    setLoading(true);
    try {
      let page = 1;
      let projects: any[] = [];
      let totalPages = 1;

      do {
        const query = new URLSearchParams({
          listingType: purpose,
          page: page.toString(),
          size: "100",
        });
        const res = await fetch(`https://admin.bnan-realestate.com//api/properties?${query.toString()}`, {
          cache: "no-store",
        });
        const json = await res.json();
        projects = projects.concat(json.data.list || []);
        totalPages = Math.ceil(json.data.totalSize / 100);
        page++;
      } while (page <= totalPages);

      setAllProjects(projects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, [purpose]);

  // Filtered & searchable list
 const filteredList = useMemo(() => {
  return allProjects.filter((item: any) => {
    const city = normalize(item.cityName);
    const region = normalize(item.region);
    const developer = normalize(item.developer);
    const title = normalize(item.title);
    const listingType = normalize(item.listingType);
    const propertyTypes = item.propertyType?.map(normalize) || [];
    const floorPlans = item.newParam?.floorPlan?.map((fp: any) => normalize(fp.name)) || [];

    // Keyword search
    const matchesKeyword =
      !keyword ||
      city.includes(keyword) ||
      region.includes(keyword) ||
      developer.includes(keyword) ||
      title.includes(keyword) ||
      listingType.includes(keyword);

    // Property type filter (exact match)
    const matchesType = !typeParam || propertyTypes.includes(typeParam);

    // Bedrooms filter (exact match)
    const matchesBedrooms =
      !bedroomsParam || floorPlans.includes(bedroomsParam + " bedrooms"); // ensure exact match like "2 Bedrooms"

    return matchesKeyword && matchesType && matchesBedrooms;
  });
}, [allProjects, keyword, typeParam, bedroomsParam]);


  // Pagination
  const total = filteredList.length;
  const totalPages = Math.ceil(total / PER_PAGE);
  const paginatedList = filteredList.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/search?${params.toString()}`);
    setCurrentPage(page);
  };

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">
        Search Results ({total})
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : paginatedList.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paginatedList.map((item: any) => (
              <ProjectCard key={item.id} property={item} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
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
