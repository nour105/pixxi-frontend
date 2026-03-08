"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyCard from "../components/home/ProjectCard";
import { getProperties } from "../lib/api";

interface Project {
  id: number;
  title: string;
  developer: string;
  cityName?: string;
  price?: number;
  bedRooms?: number;
  propertyType?: string[];
  amenities?: string[];
  newParam?: {
    bedroomMin?: string;
    bedroomMax?: string;
    handoverTime?: string;
  };
  photos?: string[];
}

export default function ProjectsClient() {

  const perPage = 12;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [projects,setProjects] = useState<Project[]>([]);
  const [loading,setLoading] = useState(true);

  const [page,setPage] = useState<number>(Number(searchParams.get("page") || 1));
  const [totalPages,setTotalPages] = useState(1);
  const [totalListings,setTotalListings] = useState(0);

  const [developers,setDevelopers] = useState<string[]>([]);
  const [cities,setCities] = useState<string[]>([]);
  const [types,setTypes] = useState<string[]>([]);
  const [amenities,setAmenities] = useState<string[]>([]);
  const [handoverYears,setHandoverYears] = useState<number[]>([]);
  const [bedroomOptions,setBedroomOptions] = useState<number[]>([]);

  const [filters,setFilters] = useState({
    developer: searchParams.get("developer") || "",
    city: searchParams.get("city") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    propertyType: searchParams.get("propertyType") || "",
    amenity: searchParams.get("amenity") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    handoverYear: searchParams.get("handoverYear") || "",
  });


  // ================= FETCH PROJECTS =================

  const fetchProjects = async (pageNumber = 1, appliedFilters = filters) => {

    setLoading(true);

    const hasFilters = Object.values(appliedFilters).some(v => v !== "");

    try {

      // ================= WITH FILTER =================
      if(hasFilters){

        const res = await getProperties({
          page:1,
          perPage:2000
        });

        const list = res?.data?.list || [];

        const filtered = list.filter((p:Project)=>{

          if(appliedFilters.developer && p.developer !== appliedFilters.developer) return false;

          if(appliedFilters.city && p.cityName !== appliedFilters.city) return false;

          if(appliedFilters.propertyType && !p.propertyType?.includes(appliedFilters.propertyType)) return false;

          if(appliedFilters.minPrice && p.price && p.price < Number(appliedFilters.minPrice)) return false;

          if(appliedFilters.maxPrice && p.price && p.price > Number(appliedFilters.maxPrice)) return false;

          if(appliedFilters.handoverYear){
            const year = new Date(p.newParam?.handoverTime || "").getFullYear();
            if(year !== Number(appliedFilters.handoverYear)) return false;
          }

          if(appliedFilters.bedrooms){

            const min = Number(p.newParam?.bedroomMin || 0);
            const max = Number(p.newParam?.bedroomMax || 0);
            const b = Number(appliedFilters.bedrooms);

            if(b < min || b > max) return false;
          }

          return true;

        });

        const total = filtered.length;
        const totalPagesCalc = Math.ceil(total / perPage);

        const paginated = filtered.slice(
          (pageNumber - 1) * perPage,
          pageNumber * perPage
        );

        setProjects(paginated);
        setTotalPages(totalPagesCalc);
        setTotalListings(total);
        setPage(pageNumber);

      }

      // ================= WITHOUT FILTER =================

      else{

        const res = await getProperties({
          page:pageNumber,
          perPage
        });

        const list = res?.data?.list || [];

        setProjects(list);
        setPage(res?.data?.currentPage || pageNumber);

        const total = Math.ceil((res?.data?.totalSize || list.length) / perPage);

        setTotalPages(total);
        setTotalListings(res?.data?.totalSize || list.length);

        // build filter lists from first page
        if(list.length){

          setDevelopers([...new Set(list.map((p:Project)=>p.developer).filter(Boolean))] as string[]);
          setCities([...new Set(list.map((p:Project)=>p.cityName).filter(Boolean))] as string[]);
          setTypes([...new Set(list.flatMap((p:Project)=>p.propertyType || []))] as string[]);
          setAmenities([...new Set(list.flatMap((p:Project)=>p.amenities || []))] as string[]);

          const years = new Set<number>();
          const bedrooms = new Set<number>();

          list.forEach((p:any)=>{

            if(p.newParam?.handoverTime){
              years.add(new Date(p.newParam.handoverTime).getFullYear());
            }

            const min = Number(p.newParam?.bedroomMin || 0);
            const max = Number(p.newParam?.bedroomMax || 0);

            if(min) bedrooms.add(min);
            if(max) bedrooms.add(max);

          });

          setHandoverYears(Array.from(years).sort());
          setBedroomOptions(Array.from(bedrooms).sort());

        }

      }

      // ================= UPDATE URL =================

      const params = new URLSearchParams();

      Object.entries({ ...appliedFilters, page: pageNumber.toString() }).forEach(([k,v])=>{
        if(v) params.set(k,v);
      });

      router.replace(`?${params.toString()}`);

    }catch(error){

      console.error(error);

    }

    setLoading(false);

  };


  // ================= USE EFFECT =================

  useEffect(()=>{

    fetchProjects(page,filters);

  },[filters,page]);


  // ================= FILTER CHANGE =================

  const handleFilterChange = (key:string,value:string)=>{

    setFilters(prev=>({
      ...prev,
      [key]:value
    }));

    setPage(1);

  };


  // ================= RESET FILTER =================

  const resetFilters = ()=>{

    setFilters({
      developer:"",
      city:"",
      bedrooms:"",
      propertyType:"",
      amenity:"",
      minPrice:"",
      maxPrice:"",
      handoverYear:"",
    });

    setPage(1);

  };


  return (

    <section className="max-w-7xl mx-auto py-16 px-4">

      <h1 className="text-4xl font-bold mb-10">
        All Projects
      </h1>


      {/* ================= FILTERS ================= */}

      <div className="grid md:grid-cols-8 gap-3 mb-10">

        <select
          value={filters.developer}
          onChange={e=>handleFilterChange("developer",e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Developer</option>
          {developers.map(d=><option key={d}>{d}</option>)}
        </select>


        <select
          value={filters.city}
          onChange={e=>handleFilterChange("city",e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">City</option>
          {cities.map(c=><option key={c}>{c}</option>)}
        </select>


        <select
          value={filters.propertyType}
          onChange={e=>handleFilterChange("propertyType",e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Type</option>
          {types.map(t=><option key={t}>{t}</option>)}
        </select>


        <select
          value={filters.bedrooms}
          onChange={e=>handleFilterChange("bedrooms",e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Bedrooms</option>
          {bedroomOptions.map(b=><option key={b}>{b} BR</option>)}
        </select>


        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={e=>handleFilterChange("minPrice",e.target.value)}
          className="border rounded-lg px-3 py-2"
        />


        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={e=>handleFilterChange("maxPrice",e.target.value)}
          className="border rounded-lg px-3 py-2"
        />


        <select
          value={filters.handoverYear}
          onChange={e=>handleFilterChange("handoverYear",e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Handover</option>
          {handoverYears.map(y=><option key={y}>{y}</option>)}
        </select>


        <button
          onClick={resetFilters}
          className="bg-red-500 text-white rounded-lg px-4"
        >
          Reset
        </button>

      </div>


      {/* ================= PROJECT GRID ================= */}

      {loading ? (

        <p>Loading...</p>

      ) : projects.length === 0 ? (

        <p>No projects found</p>

      ) : (

        <>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {projects.map(p=>(
              <PropertyCard key={p.id} property={p}/>
            ))}

          </div>


          {/* ================= PAGINATION ================= */}

          <div className="flex justify-center gap-6 mt-12">

            <button
              disabled={page===1}
              onClick={()=>setPage(p=>p-1)}
              className="border px-4 py-2 rounded"
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages} ({totalListings} listings)
            </span>

            <button
              disabled={page===totalPages}
              onClick={()=>setPage(p=>p+1)}
              className="border px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}