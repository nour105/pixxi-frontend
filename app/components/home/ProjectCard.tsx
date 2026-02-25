import Link from "next/link";

export default function ProjectCard({ property }: any) {
  return (
    <Link href={`/projects/${property.propertyId}`} className="block">
      <div className="rounded-2xl overflow-hidden shadow-lg bg-white group hover:-translate-y-1 transition cursor-pointer">
        {/* Image */}
        <div className="relative h-56">
          <img
            src={property.photos?.[0] || "/project-placeholder.jpg"}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
          <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            {property.listingType === "NEW" ? "Off-Plan" : property.listingType}
          </span>

          {property.newParam?.handoverTime && (
            <span className="absolute top-10 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              Delivery: {new Date(property.newParam.handoverTime).getFullYear()}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {property.developer && (
            <span className="inline-block bg-white shadow px-3 py-1 text-xs font-semibold rounded mb-2">
              {property.developer}
            </span>
          )}
          <h3 className="font-bold text-lg leading-tight line-clamp-2">
            {property.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {property.cityName}
            {property.region && `, ${property.region}`}
          </p>
          <p className="font-bold text-lg mt-3">
            AED {property.price?.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}