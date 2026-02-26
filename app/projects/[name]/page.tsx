"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ================= UTIL ================= */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* ================= PAGE ================= */
interface Style {
  id: string;
  title: string;
  imgUrl: string[];
  area: number;
}

export default function ProjectPage() {
  const { name } = useParams();
  const router = useRouter();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [amenitiesMap, setAmenitiesMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadProject = async () => {
      try {
        const res = await fetch(
          "https://admin.bnan-realestate.com/api/properties?page=1&size=1000",
          { cache: "no-store" }
        );
        const json = await res.json();
        const list = json?.data?.list || [];
        const match = list.find((p: any) => slugify(p.title) === name);
        setProject(match || null);
      } catch (e) {
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [name]);

  // Fetch amenities
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await fetch(`https://admin.bnan-realestate.com/api/properties/amenities`);
        if (!res.ok) throw new Error("Failed to load amenities");
        const json = await res.json();
        const map: Record<string, string> = {};
        json.data.forEach((amenity: any) => {
          map[amenity.code] = amenity.name;
        });
        setAmenitiesMap(map);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAmenities();
  }, []);

  if (loading)
    return <p className="text-center mt-20">Loading...</p>;

  if (!project)
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 mb-4">Project not found</p>
        <button onClick={() => router.back()} className="text-blue-600 underline">
          Go back
        </button>
      </div>
    );

  const agent = project.agent || project.portalAgent || null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back to projects
        </button>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
          {project.photos?.slice(0, 4).map((img: string, i: number) => (
            <img key={i} src={img} className="h-64 w-full object-cover" alt={project.title} />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow p-6 sticky top-24 h-fit">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <p className="text-gray-500 mt-1">{project.region}, {project.cityName}</p>

          {project.price && (
            <p className="mt-4 text-3xl font-bold text-blue-600">
              AED {project.price.toLocaleString()}
            </p>
          )}

          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold">
            Register Interest
          </button>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold mb-3">About the project</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line max-w-4xl">
          {project.description}
        </p>
      </section>

      {/* Amenities */}
      {project.amenities?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold mb-3">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {project.amenities.map((amenity: string) => (
              <span
                key={amenity}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {amenitiesMap[amenity] || amenity}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Floor Plans */}
      {project.newParam?.floorPlan?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold mb-3">Units / Floor Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.newParam.floorPlan.map((plan: Style) => (
              <div key={plan.id} className="border rounded-xl overflow-hidden">
                <img
                  src={plan.imgUrl[0]}
                  alt={plan.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h4 className="font-semibold">{plan.title}</h4>
                  <p className="text-sm text-gray-500">Area: {plan.area} sqft</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Agent Info */}
      {agent && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold mb-3">Contact Agent</h2>
          <div className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row items-center gap-4">
            <img
              src={agent.avatar || "/avatar-placeholder.png"}
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{agent.name}</h3>
              {agent.email && <p className="text-sm text-gray-500">{agent.email}</p>}
              {agent.phone && <p className="text-sm text-gray-500">{agent.phone}</p>}
              {agent.phone && (
                <a
                  href={`https://wa.me/${agent.phone.replace(/\D/g, "")}`}
                  className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded"
                >
                  Contact via WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}