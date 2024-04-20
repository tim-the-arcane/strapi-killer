export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return {
    title: "Home",
  };
}

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <h1>Home</h1>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur
          earum, praesentium odit neque voluptas expedita delectus officia
          consequuntur illum fuga incidunt maxime ducimus minima iusto veniam
          quia, molestiae totam corporis?
        </p>
      </div>
    </main>
  );
}
