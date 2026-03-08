import { getDevelopers } from "../../lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function TopDevelopers() {
  const res = await getDevelopers();
  const list = res?.data?.list || [];

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Top Developers</h2>

        <Link
          href="/developers"
          className="text-sm font-semibold uppercase text-black hover:underline"
        >
          View all developers &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {list.slice(0, 8).map((dev: any) => (
          <Link
            key={dev.id}
            href={`/developers/${encodeURIComponent(dev.name)}/projects`}
            className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
          >
            {/* Logo */}
            <div className="relative h-24 w-full mb-4 flex items-center justify-center">
              <Image
                src={dev.logoUrl}
                alt={dev.name}
                fill
                className="object-contain grayscale group-hover:grayscale-0 transition"
              />
            </div>

            {/* Name
            <h3 className="text-center font-semibold text-gray-900">
              {dev.name}
            </h3> */}

            {/* CTA */}
            <p className="mt-2 text-center text-sm text-black hover:underline opacity-0 group-hover:opacity-100 transition">
              View projects →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}