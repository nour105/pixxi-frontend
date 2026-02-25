// app/search/HeroSearch.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TABS = [
  { key: "RENT", label: "Rent" },
  { key: "BUY", label: "Buy" },
  { key: "NEW", label: "New projects" },
  { key: "COMMERCIAL", label: "Commercial" },
];

export default function HeroSearch() {
  const router = useRouter();

  const [purpose, setPurpose] = useState("RENT");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (purpose) params.set("purpose", purpose);
    if (location) params.set("q", location);
    if (propertyType) params.set("type", propertyType);
    if (bedrooms) params.set("bedrooms", bedrooms);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <section
      className="relative h-[520px] bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-center px-4">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center mb-3">
          Your home search starts here
        </h1>
        <p className="text-white/90 text-center mb-8">
          Find properties to rent, buy or invest.
        </p>

        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-4">
          {/* Tabs */}
          <div className="flex justify-center mb-4">
            <div className="flex bg-gray-100 rounded-full p-1">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setPurpose(tab.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    purpose === tab.key
                      ? "bg-white shadow text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              className="flex-1 w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Location, project or developer"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <select
              className="md:w-48 w-full border rounded-xl px-4 py-3"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Property type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="townhouse">Townhouse</option>
            </select>

            <select
              className="md:w-40 w-full border rounded-xl px-4 py-3"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <option value="">Bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>

            <button
              onClick={handleSearch}
              className="md:w-32 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold px-6 py-3"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}