"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import PropertyLeadForm from "../../components/PropertyLeadForm";
import { getPropertyById } from "../../lib/api";



import "swiper/css";
import "swiper/css/navigation";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import {
  MapPin,
  Building,
  Calendar,
  Phone,
  MessageCircle,
  Bath,
  BedDouble,
  Ruler,
} from "lucide-react";

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

interface Style {
  id: string;
  title: string;
  imgUrl: string[];
  area: number;
}
const amenityEmojis: Record<string, string> = {
  "Study": "📚",
  "Private Garden": "🌿",
  "Security": "🛡️",
  "Maids Room": "🧹",
  "Pets Allowed": "🐾",
  "Private Pool": "🏊",
  "Children's Play Area": "🛝",
  "Covered Parking": "🚗",
  "Barbecue Area": "🍖",
  "Lobby in Building": "🏨",
  "Balcony": "🌅",
  "Private Jacuzzi": "🛁",
  "Central A/C & Heating": "❄️",
  "Private Gym": "🏋️",
  "Shared Pool": "🏊",
  "Pantry": "🍽️",
  "Mezzanine": "🏢",
  "Available Networked": "🌐",
  "Dinning in building": "🍴",
  "Shared Spa": "🧘",
  "Shared Gym": "🏋️",
  "Concierge Service": "🛎️",
  "Maid Service": "🧹",
  "Built in Wardrobes": "👕",
  "Walk-in Closet": "🚪",
  "Built in Kitchen Appliances": "🍳",
  "View of Water": "🌊",
  "View of Landmark": "🏙️",
  "Vast-compliant": "🧭",
  "Children's Pool": "🏊‍♂️",
};

// نعمل map للكود مباشرة مع الاسم والemoji
const amenitiesMapWithEmoji: Record<string, { label: string; emoji: string }> = {
  "ST": { label: "Study", emoji: "📚" },
  "PG": { label: "Private Garden", emoji: "🌿" },
  "SE": { label: "Security", emoji: "🛡️" },
  "MR": { label: "Maids Room", emoji: "🧹" },
  "PA": { label: "Pets Allowed", emoji: "🐾" },
  "PP": { label: "Private Pool", emoji: "🏊" },
  "PR": { label: "Children's Play Area", emoji: "🛝" },
  "CP": { label: "Covered Parking", emoji: "🚗" },
  "BR": { label: "Barbecue Area", emoji: "🍖" },
  "LB": { label: "Lobby in Building", emoji: "🏨" },
  "BA": { label: "Balcony", emoji: "🌅" },
  "PJ": { label: "Private Jacuzzi", emoji: "🛁" },
  "AC": { label: "Central A/C & Heating", emoji: "❄️" },
  "PY": { label: "Private Gym", emoji: "🏋️" },
  "SP": { label: "Shared Pool", emoji: "🏊" },
  "PN": { label: "Pantry", emoji: "🍽️" },
  "MZ": { label: "Mezzanine", emoji: "🏢" },
  "AN": { label: "Available Networked", emoji: "🌐" },
  "DN": { label: "Dinning in building", emoji: "🍴" },
  "SS": { label: "Shared Spa", emoji: "🧘" },
  "SY": { label: "Shared Gym", emoji: "🏋️" },
  "CS": { label: "Concierge Service", emoji: "🛎️" },
  "MS": { label: "Maid Service", emoji: "🧹" },
  "BW": { label: "Built in Wardrobes", emoji: "👕" },
  "WC": { label: "Walk-in Closet", emoji: "🚪" },
  "BK": { label: "Built in Kitchen Appliances", emoji: "🍳" },
  "VW": { label: "View of Water", emoji: "🌊" },
  "BL": { label: "View of Landmark", emoji: "🏙️" },
  "VC": { label: "Vast-compliant", emoji: "🧭" },
  "CO": { label: "Children's Pool", emoji: "🏊‍♂️" },
};
const BASE_IMG = "https://pixxicrm.ae/api";

/* يحوّل نص Pixxi → نفس مفاتيح amenityEmojis عندك حرفيًا */
const AMENITY_NORMALIZER: Record<string, string> = {
  "bbq area": "Barbecue Area",
  "barbecue": "Barbecue Area",

  "kids play area": "Children's Play Area",
  "children play area": "Children's Play Area",

  "gym": "Private Gym",
  "shared gym": "Shared Gym",
  "fitness": "Private Gym",

  "swimming pool": "Shared Pool",
  "pool": "Shared Pool",
  "private pool": "Private Pool",
  "children pool": "Children's Pool",

  "parking": "Covered Parking",
  "car parking": "Covered Parking",

  "maid room": "Maids Room",
  "maids room": "Maids Room",

  "security": "Security",

  "balcony": "Balcony",
  "jacuzzi": "Private Jacuzzi",

  "wardrobes": "Built in Wardrobes",
  "walk in closet": "Walk-in Closet",

  "kitchen appliances": "Built in Kitchen Appliances",

  "view of water": "View of Water",
  "view of landmark": "View of Landmark",

  "central ac": "Central A/C & Heating",
  "ac": "Central A/C & Heating",

  "pets": "Pets Allowed",

  "study": "Study",
  "garden": "Private Garden",
};

function mapPixxiToProject(p: any) {
  /* ===== Amenities Normalize to your emoji keys ===== */
  const normalizedAmenities = [
    ...new Set(
      (p?.newParameter?.amenities || "")
        .split(",")
        .map((a: string) => a.trim().toLowerCase())
        .filter(Boolean)
        .map((a: string) => AMENITY_NORMALIZER[a] || a)
    ),
  ];

  return {
    title: p.name,
    description: p.description,
    price: p.price,
    cityName: p.cityName,
    region: p.regionName,
    developer: p.developerName,
    propertyId: p.propertyId,

    photos: (p.photos || []).map((ph: string) =>
      ph.startsWith("http") ? ph : `${BASE_IMG}${ph}`
    ),

    /* 👇 هيدي أهم سطر للـ emojis */
    amenities: normalizedAmenities,

    newParam: {
      handoverTime: p.newParameter?.handoverTime,
      floorPlan: (p.newParameter?.style || []).map((s: any) => ({
        id: s.id,
        title: s.title,
        area: s.area,
        imgUrl: (s.imgUrl || []).map((i: string) =>
          i.startsWith("http") ? i : `${BASE_IMG}${i}`
        ),
      })),
    },

    agent: {
      name: p.portalAgentName,
      phone: p.portalAgentPhone,
      avatar: p.portalAgentAvatar
        ? `${BASE_IMG}${p.portalAgentAvatar}`
        : null,
    },
  };
}
export default function ProjectPage() {
  const params = useParams();
const slug = params?.name as string;

// جيب الـ id من آخر الرابط
const propertyId = slug.split("-").pop();
  const router = useRouter();
  const name = params?.name || "";
const [activeGallery, setActiveGallery] = useState<number | null>(null);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [amenitiesMap, setAmenitiesMap] = useState<Record<string, string>>({});

useEffect(() => {
  const loadProject = async () => {
    try {
      const res = await fetch(
        `https://dataapi.pixxicrm.ae/pixxiapi/v1/${propertyId}`,
        {
          cache: "no-store",
          headers: {
            "X-PIXXI-TOKEN": "FWD4fkbabKionq77p3jNuf0g3cU1ZvVZ",
          },
        }
      );

      const json = await res.json();

      const mapped = mapPixxiToProject(json.data);

      setProject(mapped);
    } catch (err) {
      console.error(err);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  if (propertyId) loadProject();
}, [propertyId]);

  useEffect(() => {
    const loadAmenities = async () => {
      const res = await fetch(
        "https://admin.bnan-realestate.com/api/properties/amenities"
      );
      const json = await res.json();

      const map: Record<string, string> = {};
      json.data?.forEach((a: any) => (map[a.code] = a.name));
      setAmenitiesMap(map);
    };

    loadAmenities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Project Not Found</h1>
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const agent = project.agent || project.portalAgent;

  return (
    <div className="bg-[#f7f7f7]">

      {/* HERO */}

      <section className="relative h-[90vh]">

        <Image
          src={project.photos?.[0] || "/bnan-realestate.jpg"}
          alt={project.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"/>

        <div className="absolute bottom-16 w-full">
          <div className="max-w-7xl mx-auto px-6">

            <motion.div
              initial={{opacity:0, y:40}}
              animate={{opacity:1, y:0}}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 text-white"
            >

              <h1 className="text-5xl font-bold mb-3">
                {project.title}
              </h1>

              <p className="flex items-center gap-2 text-lg opacity-80 mb-6">
                <MapPin size={18}/>
                {project.region}, {project.cityName}
              </p>

              <div className="grid md:grid-cols-4 gap-8">

                <div>
                  <p className="opacity-70">Starting Price</p>
                  <h3 className="text-2xl font-bold text-[#d8b564]">
                    AED {project.price?.toLocaleString()}
                  </h3>
                </div>

                <div>
                  <p className="opacity-70">Developer</p>
                  <h3 className="font-semibold">
                    {project.developer}
                  </h3>
                </div>

                <div>
                  <p className="opacity-70">Handover</p>
                  <h3 className="font-semibold">
                    {new Date(
                      project.newParam?.handoverTime
                    ).getFullYear()}
                  </h3>
                </div>

                <div className="flex gap-3">

                  <a
                    href={`https://wa.me/${agent?.phone}`}
                    className="flex items-center gap-2 bg-green-500 px-5 py-3 rounded-lg"
                  >
                    <MessageCircle size={18}/>
                    WhatsApp
                  </a>

                  <button className="border border-white px-5 py-3 rounded-lg hover:bg-white hover:text-black transition">
                    Contact
                  </button>

                </div>

              </div>

            </motion.div>

          </div>
        </div>
      </section>
 <div> 

  <PropertyLeadForm
  propertyReference={project.propertyId}
  developer={project.developer}
  preferredLocation={project.region + ", " + project.cityName}
  project_name={project.title}
  floorPlans={project.newParam?.floorPlan || []}
/>
      </div>
     {/* OVERVIEW */}

<section className="max-w-7xl mx-auto px-6 py-24">

  <div className=" gap-16 items-start">

    {/* LEFT CONTENT */}

    <div>

      <p className="text-[#d8b564] uppercase tracking-widest text-sm mb-3">
        About The Project
      </p>

      <h2 className="text-4xl font-bold mb-6 leading-tight">
        Discover {project.title}
      </h2>

      <p className="text-gray-600 text-lg leading-relaxed">
        {project.description}
      </p>

    </div>


  </div>

</section>
 {/* AMENITIES */}

{project.amenities?.length > 0 && (

<section className="py-20 bg-white">

  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-3xl font-bold mb-10 text-center">
      Amenities
    </h2>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
  {project.amenities.map((code: string) => {
    const amenity = amenitiesMapWithEmoji[code.toUpperCase()]; // force uppercase
    if (!amenity) return null; // skip unknown codes

    return (
      <div key={code} className="flex items-center gap-3 text-gray-700 text-lg">
        <span className="text-xl">{amenity.emoji}</span>
        <span>{amenity.label}</span>
      </div>
    );
  })}
</div>

  </div>

</section>

)}

{/* FLOOR PLANS */}

{project.newParam?.floorPlan?.length > 0 && (

<section className="max-w-7xl mx-auto px-6 py-20">

  <h2 className="text-3xl font-bold text-center mb-12">
    Floor Plans
  </h2>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

    {project.newParam.floorPlan.map((plan: Style) => (

      <div
        key={plan.id}
        className="bg-white rounded-xl border hover:shadow-lg transition p-4"
      >

        <div
          className="relative h-48 cursor-pointer"
          onClick={() => setActivePlan(plan.imgUrl?.[0])}
        >

          <Image
            src={plan.imgUrl?.[0]}
            alt={plan.title}
            fill
            className="object-contain"
          />

        </div>

        <div className="mt-3 text-center">

          <h3 className="font-semibold text-sm">
            {plan.title}
          </h3>

          <p className="text-gray-500 text-sm">
            {plan.area} sqft
          </p>

        </div>

      </div>

    ))}

  </div>

</section>

)}
     {/* GALLERY */}

{project.photos?.length > 1 && (

<section className="bg-white py-20">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-3xl font-bold text-center mb-12">
      Gallery
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {project.photos.slice(1,12).map((img:string,i:number)=>(

        <div
          key={i}
          onClick={()=>setActiveGallery(i)}
          className="relative h-44 rounded-xl overflow-hidden cursor-pointer group"
        >

          <Image
            src={img}
            alt=""
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition"/>

        </div>

      ))}

    </div>

  </div>

</section>

)}
      {activePlan && (

<div
  className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
  onClick={() => setActivePlan(null)}
>

  <Image
    src={activePlan}
    alt="Floor Plan"
    width={1200}
    height={900}
    className="max-h-[90vh] w-auto rounded-xl"
  />

</div>

)}
{activeGallery !== null && (

<div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">

  {/* CLOSE */}

  <button
    onClick={()=>setActiveGallery(null)}
    className="absolute top-6 right-6 text-white"
  >
    <X size={32}/>
  </button>

  <div className="w-full max-w-6xl px-6">

    <Swiper
      modules={[Navigation]}
      navigation
      initialSlide={activeGallery}
      className="w-full"
    >

      {project.photos.slice(1,12).map((img:string,i:number)=>(

        <SwiperSlide key={i}>

          <div className="relative w-full h-[80vh]">

            <Image
              src={img}
              alt=""
              fill
              className="object-contain"
            />

          </div>

        </SwiperSlide>

      ))}

    </Swiper>

  </div>

</div>

)}

      {/* AGENT */}
{/* 
      {agent && (

        <section className="max-w-5xl mx-auto px-6 py-20">

          <div className="bg-white rounded-3xl shadow-xl p-10 flex items-center gap-8">

            <Image
              src={agent.avatar || "/avatar.png"}
              alt={agent.name}
              width={120}
              height={120}
              className="rounded-full"
            />

            <div className="flex-1">

              <h3 className="text-2xl font-bold">
                {agent.name}
              </h3>

              <p className="text-gray-500 mb-4">
                Real Estate Consultant
              </p>

              <p className="font-semibold">
                {agent.phone}
              </p>

            </div>

            <a
              href={`https://wa.me/${agent.phone}`}
              className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <MessageCircle/>
              WhatsApp
            </a>

          </div>

        </section>

      )} */}

{/* CTA */}

<section className="relative py-28 bg-black text-white overflow-hidden">

  {/* BACKGROUND GLOW */}

  <div className="absolute inset-0 bg-gradient-to-br from-[#d8b564]/20 via-transparent to-transparent"/>

  <div className="relative max-w-6xl mx-auto px-6">

    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-14 text-center">

      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Schedule a Private Viewing
      </h2>

      <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
        Discover this exclusive property with a personalized tour. 
        Our property specialist will guide you through every detail.
      </p>

      <div className="flex flex-wrap justify-center gap-4">

        <a
          href={`https://wa.me/${agent?.phone}`}
          className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
        >
          <MessageCircle size={18}/>
          WhatsApp
        </a>

        <a
          href={`tel:${agent?.phone}`}
          className="border border-white/30 hover:bg-white hover:text-black px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
        >
          <Phone size={18}/>
          Call Now
        </a>

        <Link
          href="/projects"
          className="bg-[#d8b564] hover:opacity-90 px-8 py-4 rounded-xl font-semibold transition"
        >
          View All Projects
        </Link>

      </div>

    </div>

  </div>

</section>

    </div>
  );
}