import configPromise from "@payload-config";
import { getTranslations } from "next-intl/server";
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
    <div className="grid gap-4 pt-8">
      {posts.length === 0 && <p>{t("noArticles")}</p>}

      {posts.length > 0 && (
        <>
          {posts.map((post) => (
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
          ))}
        </>
      )}
    </div>
  );
}
