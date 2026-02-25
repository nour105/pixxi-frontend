"use client";

import { useEffect, useState } from "react";
import { searchAreas, getPropertiesByArea } from "../../lib/api";
import PropertyCard from "./PropertyCard";

export default function FeaturedByArea() {
  const [areas, setAreas] = useState<any[]>([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // fetch areas once
  useEffect(() => {
    searchAreas("Dubai").then((res) => {
      const list = res?.data?.data || [];
      setAreas(list);
      setSelectedArea(list[0]); // default
    });
  }, []);

  // fetch properties when area changes
  useEffect(() => {
    if (!selectedArea) return;

    setLoading(true);
    getPropertiesByArea(selectedArea.fullName)
      .then((res) => {
        setProperties(res?.data?.list || []);
      })
      .finally(() => setLoading(false));
  }, [selectedArea]);

  return (
    <section className="max-w-6xl mx-auto py-14 px-4">
      <h2 className="text-2xl font-semibold mb-6">
        Explore projects by area
      </h2>

      {/* Area Tabs */}
      <div className="flex gap-6 border-b mb-8 overflow-x-auto">
        {areas.slice(0, 6).map((area, index) => (
          <button
            key={`${area.id}-${index}`}
            onClick={() => setSelectedArea(area)}
            className={`pb-3 text-sm font-medium whitespace-nowrap ${
              selectedArea?.id === area.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {area.fullName}
          </button>
        ))}
      </div>

      {/* Properties */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.slice(0, 6).map((item: any) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      )}
    </section>
  );
}
