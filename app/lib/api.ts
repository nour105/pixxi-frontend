const API_URL = "http://localhost:8000/api";

export async function getProperties(params?: Record<string, any>) {
  const query = new URLSearchParams(params as any).toString();
  const res = await fetch(`${API_URL}/properties?${query}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getDeveloperProperties(name: string, page = 1, size = 12) {
  const res = await fetch(
    `http://localhost:8000/api/developers/${encodeURIComponent(name)}/properties?size=${size}&page=${page}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}
export async function getDevelopers() {
  const res = await fetch(`${API_URL}/developers`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getAreas(city: string) {
  const res = await fetch(`${API_URL}/areas/${city}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getAgents() {
  const res = await fetch(`${API_URL}/agents`, {
    cache: "no-store",
  });
  return res.json();
}
export const getPropertiesByArea = async (areaName: string) => {
  return fetch(
    `${API_URL}/properties?area=${areaName}`,
    { cache: "no-store" }
  ).then((res) => res.json());
};
// api.ts
// export const getProjectsByCityy = async (city: string) => {
//   const res = await fetch(`http://localhost:8000/api/properties?city=${encodeURIComponent(city)}`);
//   if (!res.ok) throw new Error("Failed to fetch projects");
//   return res.json();
// };
export const getProjectsByCity = async (
  city: string,
  page = 1,
  size = 12
) => {
  const res = await fetch(
    `http://localhost:8000/api/properties?city=${encodeURIComponent(
      city
    )}&page=1&size=2000`
  );

  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};






export async function searchAreas(
  query: string,
  page: number = 1,
  size: number = 8
) {
  const res = await fetch(`${API_URL}/areas/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, page, size }),
    cache: "no-store",
  });

  return res.json();
}