import { posts } from "@/content/posts";
import { redirect } from "next/navigation";

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
  const id = Number(getIdFromSlug(slug));

  if (!id || typeof id !== "number") {
    redirect(`/${locale}/404`);
  }

  const post = posts.find((post) => post.id === id);

  if (!post) {
    redirect(`/${locale}/404`);
  }

  if (post.slug !== slug) {
    redirect(`/${post.locale}/blog/${post.slug}`);
  }

  // if (post.slug !== slug) {
  //   redirect(`/${locale}/blog/${post.slug}`);
  // }

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
