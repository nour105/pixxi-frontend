'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDeveloperProperties } from "../../../lib/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Property {
  id: number;
  title: string;
  price: number;
  photos: string[];
  region: string;
  cityName: string;
}

export default function DeveloperProjectsPage() {
  const params = useParams();
  const developerName = params.name as string;

  const [properties, setProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const pageSize = 6;

  useEffect(() => {
    if (!developerName) return;

    setLoading(true);

    getDeveloperProperties(developerName, currentPage, pageSize)
      .then((res) => {
        setProperties(res.data.list || []);
        setTotalSize(res.data.totalSize || 0);
      })
      .finally(() => setLoading(false));
  }, [developerName, currentPage]);

  const totalPages = Math.ceil(totalSize / pageSize);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {developerName} Projects
      </h1>

      {loading && (
        <div className="text-center py-10">Loading projects...</div>
      )}

      {!loading && properties.length === 0 && (
        <div className="text-center py-10">
          No projects found.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>

      {/* ===== Improved Pagination ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">
          {/* Prev */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;

            // Show only nearby pages for clean UI
            if (
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1
            ) {
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            }

            return null;
          })}

          {/* Next */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

/* ============================= */
/* Property Card with Swiper    */
/* ============================= */

function PropertyCard({ property }: { property: Property }) {
  const images = property.photos || [];

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-xl transition duration-300">
      {images.length > 0 && (
      <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 4000 }}
  loop
  slidesPerView={1}
  className="h-52 group"
>
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={property.title}
                className="w-full h-52 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="p-4">
        <h2 className="font-semibold text-lg mb-1">
          {property.title}
        </h2>
        <p className="text-gray-500 text-sm">
          {property.cityName} - {property.region}
        </p>
        <p className="mt-3 font-bold text-blue-600">
          AED {property.price?.toLocaleString()}
        </p>
      </div>
    </div>
  );
}