import { extractExcerpt } from "@/lib/extractExcerpt";
import configPromise from "@payload-config";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

const getBlogPosts = async (locale: string) => {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find<"posts">({
    collection: "posts",
    locale: locale as "de" | "en",
  });

  return posts.docs;
};

export default async function BlogIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const posts = await getBlogPosts(locale);
  const t = await getTranslations("pages.Blog");

  return (
    <div className="grid gap-4">
      {posts.length === 0 && <p>{t("noArticles")}</p>}

      {posts.length > 0 && (
        <>
          {posts.map((post) => (
            <article
              key={post.id}
              className="p-4 border rounded-xl flex flex-col items-start gap-4"
            >
              <Link href={`/${locale}/blog/${post.slug}-${post.id}`}>
                <h1 className="text-4xl font-light">{post.title}</h1>
              </Link>

              {/* Prioritize the excerpt */}
              {post?.excerpt && <p>{post.excerpt}</p>}

              {/* If no excerpt is available, try using the meta description */}
              {!post?.excerpt && post.meta?.description && (
                <p>{post.meta.description}</p>
              )}

              {/* If neither excerpt nor meta description are available, generate the excerpt from the content */}
              {!post?.excerpt &&
                !post.meta?.description &&
                post.content_html && (
                  <p>{extractExcerpt(post.content_html, undefined, "words")}</p>
                )}

              <Link href={`/${locale}/blog/${post.slug}-${post.id}`}>
                {t("readMore")}
              </Link>
            </article>
          ))}
        </>
      )}
    </div>
  );
}
