export const Header = () => {
  return (
    <header>
      <div className="container py-4">
        <nav>
          <ul className="flex flex-col md:flex-row md:flex-wrap gap-3">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
