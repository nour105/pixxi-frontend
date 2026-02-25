export default function ProjectPropertyCard({ property }: any) {
  const handover = property?.newParam?.handoverTime
    ? new Date(property.newParam.handoverTime).getFullYear()
    : "TBC";

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white group">
      {/* Image */}
      <div className="relative h-64">
        <img
          src={property.photos?.[0] || "/project-placeholder.jpg"}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Badges */}
        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          Off-plan
        </span>

        <span className="absolute top-10 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          Delivery: {handover}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Developer */}
        {property.developer && (
          <span className="inline-block bg-white shadow px-3 py-1 text-xs font-semibold rounded mb-2">
            {property.developer}
          </span>
        )}

        {/* Title */}
        <h3 className="font-bold text-lg leading-tight line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-500 mt-1">
          {property.cityName}
          {property.region && `, ${property.region}`}
        </p>

        {/* Price */}
        <p className="font-bold text-lg mt-3">
          From{" "}
          <span className="text-blue-600">
            AED {property.price?.toLocaleString()}
          </span>
        </p>

        {/* CTA */}
        <button className="mt-4 w-full border rounded-xl py-2 text-sm font-medium hover:bg-gray-100">
          WhatsApp
        </button>
      </div>
    </div>
  );
}
