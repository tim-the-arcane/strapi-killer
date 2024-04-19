import { redirect } from "@/i18n/config";
import { notFound } from "next/navigation";
import PostList from "../../PostList";
import { getPosts } from "../../getPosts";

export const dynamic = "force-dynamic";

export default async function BlogIndexPaginated({
  params: { locale, page },
}: {
  params: { locale: "de" | "en"; page: string };
}) {
  const pageNumber = Number(page);

  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  if (pageNumber === 1) {
    redirect("/blog");
  }

  const posts = await getPosts(locale, pageNumber);

  return <PostList posts={posts} locale={locale} />;
}
