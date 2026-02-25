"use client";

import { useState } from "react";
import { searchAreas } from "../../lib/api";

export default function PopularAreas() {
  const [query, setQuery] = useState("");
  const [areas, setAreas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await searchAreas(query);
      setAreas(res?.data?.data || []);
    } catch (e) {
      console.error(e);
      setAreas([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Browse areas
        </h2>

        <input
          className="border rounded-xl p-3 w-full md:w-1/2 mb-8"
          placeholder="Search city or area"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {areas.map((area, index) => (
              <div
                key={`${area.id}-${index}`}
                className="border rounded-xl p-4 bg-white text-center hover:shadow cursor-pointer"
              >
                <p className="font-semibold">{area.fullName}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {area.locationType}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
