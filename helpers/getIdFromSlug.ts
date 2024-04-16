export default function getIdFromSlug(slug: string) {
  return slug.split("-").pop();
}
