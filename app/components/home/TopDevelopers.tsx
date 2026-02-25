'use client';

import { getDevelopers } from "../../lib/api";
import Link from "next/link";

export default async function TopDevelopers() {
  const res = await getDevelopers();
  const list = res?.data?.list || [];

  return (
    <section className="max-w-6xl mx-auto py-14 px-4">
      <h2 className="text-2xl font-semibold mb-6">Top developers</h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
        {list.slice(0, 12).map((dev: any) => (
          <Link
            key={dev.id}
            href={`/developers/${encodeURIComponent(dev.name)}/projects`}
            className="flex justify-center"
          >
            <img
              src={dev.logoUrl}
              alt={dev.name}
              className="h-14 object-contain grayscale hover:grayscale-0 transition"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}