"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyCard from "../components/home/ProjectCard";
import { getProperties, getFilters } from "../lib/api";

export default function ProjectsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const perPage = 12;

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalListings, setTotalListings] = useState(0);

  const [developers, setDevelopers] = useState([]);
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState([]);
  const [bedroomOptions, setBedroomOptions] = useState([]);
  const [handoverYears, setHandoverYears] = useState([]);

  const [filters, setFilters] = useState({
    developer: searchParams.get("developer") || "",
    city: searchParams.get("city") || "",
    propertyType: searchParams.get("propertyType") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    handoverYear: searchParams.get("handoverYear") || "",
  });

  // ================= LOAD FILTER OPTIONS =================
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await getFilters();
        setDevelopers(res?.developers ?? []);
        setCities(res?.cities ?? []);
        setTypes(res?.types ?? []);
        setBedroomOptions(res?.bedrooms ?? []);
        setHandoverYears(res?.handoverYears ?? []);
      } catch (e) {
        console.error("Failed to fetch filters:", e);
      }
    };
    loadFilters();
  }, []);

  // ================= UPDATE URL =================
  const updateURL = (newFilters: any, newPage: number) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, String(v));
    });
    params.set("page", String(newPage));
    router.replace(`/projects?${params.toString()}`, { scroll: false });
  };

  // ================= FETCH PROJECTS =================
  useEffect(() => {
    const controller = new AbortController();
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const query: any = { page, size: perPage };
        Object.entries(filters).forEach(([k, v]) => {
          if (v) query[k] = v;
        });
        const res = await getProperties(query);
        setProjects(res?.data?.list ?? []);
        setTotalListings(res?.data?.totalSize ?? 0);
        setTotalPages(Math.ceil((res?.data?.totalSize ?? 0) / perPage));
      } catch (e) {
        console.error(e);
        setProjects([]);
        setTotalListings(0);
        setTotalPages(1);
      }
      setLoading(false);
    };

    const debounce = setTimeout(fetchProjects, 300); // 300ms debounce
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [filters, page]);

  // ================= CHANGE FILTER =================
  const changeFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setPage(1);
    updateURL(newFilters, 1);
  };

  // ================= RESET FILTERS =================
  const resetFilters = () => {
    const defaultFilters = {
      developer: "",
      city: "",
      propertyType: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      handoverYear: "",
    };
    setFilters(defaultFilters);
    setPage(1);
    updateURL(defaultFilters, 1);
  };

  // ================= PAGINATION =================
  const changePage = (p: number) => {
    setPage(p);
    updateURL(filters, p);
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10">All Projects</h1>

      {/* ================= FILTERS ================= */}
      <div className="grid md:grid-cols-7 gap-3 mb-10">
        <select
          value={filters.developer}
          onChange={(e) => changeFilter("developer", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Developer</option>
          {developers.map((d, idx) => (
            <option key={idx} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={filters.city}
          onChange={(e) => changeFilter("city", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">City</option>
          {cities.map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={filters.propertyType}
          onChange={(e) => changeFilter("propertyType", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Type</option>
          {types.map((t, idx) => (
            <option key={idx} value={t}>{t}</option>
          ))}
        </select>

        <select
          value={filters.bedrooms}
          onChange={(e) => changeFilter("bedrooms", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Bedrooms</option>
          {bedroomOptions.map((b) => (
            <option key={b} value={b}>{b} BR</option>
          ))}
        </select>

        {/* <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => changeFilter("minPrice", e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => changeFilter("maxPrice", e.target.value)}
          className="border px-3 py-2 rounded"
        /> */}

        {/* <select
          value={filters.handoverYear}
          onChange={(e) => changeFilter("handoverYear", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Handover Year</option>
          {handoverYears.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select> */}

        <button
          onClick={resetFilters}
          className="bg-red-500 text-white rounded-lg px-4"
        >
          Reset
        </button>
      </div>

      {/* ================= PROJECT GRID ================= */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p: any) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center gap-2 mt-10 flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
          className="px-4 py-2 border rounded"
        >
          Prev
        </button>

        {getPageNumbers().map((p) => (
          <button
            key={p}
            onClick={() => changePage(p)}
            className={`px-4 py-2 border rounded ${p === page ? "bg-black text-white" : ""}`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => changePage(page + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>

      <p className="text-center mt-3">{totalListings} listings</p>
    </section>
  );
}