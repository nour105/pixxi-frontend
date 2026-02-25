'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Style {
  id: string;
  title: string;
  imgUrl: string[];
  area: number;
}

interface PaymentPlan {
  one: number;
  two: number;
  three: number;
  four: number;
}

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [amenitiesMap, setAmenitiesMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://admin.bnan-realestate.com/api/properties/external/${id}`, { cache: "no-store" });
        const json = await res.json();
        setProject(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await fetch(`https://admin.bnan-realestate.com/api/properties/amenities`);
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!project) return <p className="text-center mt-10">Project not found.</p>;

  const paymentPlan: PaymentPlan =
    project.newParameter?.paymentPlan
      ? JSON.parse(project.newParameter.paymentPlan)
      : { one: 0, two: 0, three: 0, four: 0 };

  const amenitiesCodes = project.newParameter?.amenities?.split(",") || [];

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-500 mb-6">{project.regionName}, {project.cityName}</p>

      {/* Gallery */}
      {project.photos?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {project.photos.map((img: string, idx: number) => (
            <img key={idx} src={img} alt={`${project.name} ${idx + 1}`} className="rounded-2xl object-cover w-full h-64" />
          ))}
        </div>
      )}

      {/* Description */}
      {project.description && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">About the Project</h2>
          <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
        </div>
      )}

      {/* Amenities */}
      {amenitiesCodes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {amenitiesCodes.map((code: string) => (
              <span key={code} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {amenitiesMap[code] || code}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Floor Plans */}
      {project.newParameter?.style?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Units / Floor Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.newParameter.style.map((style: Style) => (
              <div key={style.id} className="border rounded-xl overflow-hidden">
                <img src={style.imgUrl[0]} alt={style.title} className="w-full h-48 object-cover" />
                <div className="p-3">
                  <h4 className="font-semibold">{style.title}</h4>
                  <p className="text-sm text-gray-500">Area: {style.area} sqft</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delivery Date */}
      {project.newParameter?.handoverTime && (
        <p className="mb-6">
          <strong>Delivery Date:</strong> {new Date(project.newParameter.handoverTime).toDateString()}
        </p>
      )}

      {/* Payment Plan */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Payment Plan (%)</h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(paymentPlan).map(([key, value]) => (
            <div key={key} className="bg-gray-100 px-4 py-2 rounded text-sm font-medium">
              {key.toUpperCase()}: {value}%
            </div>
          ))}
        </div>
      </div>

      {/* Developer & Agent */}
      <div className="mt-6 p-4 border rounded-xl flex flex-col md:flex-row items-start md:items-center gap-4">
        <img src={project.agentAvatar} alt={project.agentName} className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h3 className="font-semibold">{project.agentName}</h3>
          <p className="text-sm text-gray-500">{project.agentEmail}</p>
          <p className="text-sm text-gray-500">{project.agentPhone}</p>
          <a href={`https://wa.me/${project.agentPhone.replace(/\D/g, "")}`} className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded">
            Contact via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}