export const Footer = () => {
  return (
    <footer>
      <div className="container py-4">
        <nav>
          <ul className="flex flex-col md:flex-row md:flex-wrap gap-3">
            <li>
              <a href="/impressum">Impressum</a>
            </li>
            <li>
              <a href="/datenschutz">Datenschutz</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
