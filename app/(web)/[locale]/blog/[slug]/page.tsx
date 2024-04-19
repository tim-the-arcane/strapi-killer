import getIdFromSlug from "@/helpers/getIdFromSlug";
import configPromise from "@payload-config";
import { notFound, permanentRedirect } from "next/navigation";
import { getPayload } from "payload";

const getPostById = async (id: number, locale: "de" | "en") => {
  const payload = await getPayload({ config: configPromise });

  try {
    return await payload.findByID<"posts">({
      collection: "posts",
      id,
      locale,
    });
  } catch (error) {
    return null;
  }
};

interface BlogSinglePageProps {
  params: {
    locale: "de" | "en";
    slug: string;
  };
}

const generateMetadata = async ({
  params: { locale, slug },
}: BlogSinglePageProps) => {
  // Get the post ID from the slug
  const id = Number(getIdFromSlug(slug));

  // If the ID is not a number, redirect to 404
  if (!id || typeof id !== "number") {
    notFound();
  }

  // Find the post by ID
  const post = await getPostById(id, locale as "de" | "en");

  // If the post does not exist, redirect to 404
  if (!post) {
    notFound();
  }

  return {
    title: "Blog Post",
    description: "A blog post",
  };
};

export default async function BlogSinglePage({
  params: { locale, slug },
}: BlogSinglePageProps) {
  // Get the post ID from the slug
  const id = Number(getIdFromSlug(slug));

  // If the ID is not a number, redirect to 404
  if (!id || typeof id !== "number") {
    notFound();
  }

  // Find the post by ID
  const post = await getPostById(id, locale as "de" | "en");

  // If the post does not exist, redirect to 404
  if (!post) {
    notFound();
  }

  // If the slug does not match the posts slug + id, redirect to the correct URL
  if (post.slug + "-" + id !== slug) {
    permanentRedirect(
      `${locale !== "de" ? `/${locale}` : ""}/blog/${post.slug}-${post.id}`
    );
  }

  return (
    <article
      key={post.id}
      className="p-4 border rounded-xl flex flex-col gap-4"
    >
      <h1 className="text-4xl font-light">{post.title}</h1>
      {post?.content_html && (
        <div
          className="prose prose-zinc"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />
      )}
    </article>
  );
}
