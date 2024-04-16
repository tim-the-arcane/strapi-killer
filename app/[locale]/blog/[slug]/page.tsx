import { posts } from "@/content/posts";
import { permanentRedirect, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface ProductSinglePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default function ProductSinglePage({
  params: { locale, slug },
}: ProductSinglePageProps) {
  // Get the post ID from the slug
  const id = Number(getIdFromSlug(slug));

  // If the ID is not a number, redirect to 404
  if (!id || typeof id !== "number") {
    redirect(`/${locale}/404`);
  }

  // Find the post by ID
  const post = posts.find((post) => post.id === id);

  // If the post does not exist, redirect to 404
  if (!post) {
    redirect(`/${locale}/404`);
  }

  // If the slug does not match the post, redirect to the correct URL
  if (post.slug !== slug) {
    permanentRedirect(
      `${post.locale !== "de" ? `/${post.locale}` : ""}/blog/${post.slug}`
    );
  }

  return (
    <main>
      <ul>
        <li>Id: {id}</li>
        <li>Slug: {slug}</li>
        <li>Locale: {locale}</li>
      </ul>
    </main>
  );
}

export function getIdFromSlug(slug: string) {
  return slug.split("-").pop();
}
