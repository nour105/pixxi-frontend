// utils/slugify.ts
export function slugify(text: string) {
  return text
    .toString()
    .normalize("NFD") // Remove accents
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove non-word chars
    .toLowerCase();
}
