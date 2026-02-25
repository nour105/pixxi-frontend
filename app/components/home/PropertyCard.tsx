export default function PropertyCard({ property }: any) {
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={property.photos?.[0] || "/placeholder.jpg"}
        className="h-48 w-full object-cover"
        alt={property.title}
      />

      <div className="p-4">
        <p className="text-blue-600 font-bold text-lg">
          AED {property.price?.toLocaleString()}
        </p>

        <h3 className="font-semibold mt-1 line-clamp-2">
          {property.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {property.cityName} · {property.region}
        </p>
      </div>
    </div>
  );
}
