export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main>
      <h1>Blog</h1>
      <p>Posts will go here</p>
    </main>
  );
}
