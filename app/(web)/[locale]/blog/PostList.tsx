import { Link } from "@/i18n/config";
import { extractExcerpt } from "@/lib/extractExcerpt";
import type { Post } from "@/payload-types";
import { useTranslations } from "next-intl";

interface PostListProps {
  posts: Post[];
  locale: "de" | "en";
}

export default function PostList({ posts, locale }: PostListProps) {
  const t = useTranslations("pages.Blog");

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
              {/* @ts-expect-error - i18n config needs fixing */}
              <Link href={`/blog/${post.slug}-${post.id}`} locale={locale}>
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

              {/* @ts-expect-error - i18n config needs fixing */}
              <Link href={`/blog/${post.slug}-${post.id}`} locale={locale}>
                {t("readMore")}
              </Link>
            </article>
          ))}
        </>
      )}
    </div>
  );
}
