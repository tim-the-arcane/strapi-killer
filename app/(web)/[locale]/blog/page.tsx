import PostList from "./PostList";
import { getPosts } from "./getPosts";

export const dynamic = "force-dynamic";

export default async function BlogIndexPage({
  params: { locale },
}: {
  params: { locale: "de" | "en" };
}) {
  const posts = await getPosts(locale);

  return <PostList posts={posts} locale={locale} />;
}
