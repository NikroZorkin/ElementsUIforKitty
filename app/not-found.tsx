import Link from "next/link";
import "./(site)/globals.css";
export default function NotFound() {
  return (
    <main className="error-page">
      <span className="eyebrow">404 · A SMALL DETOUR</span>
      <h1>This one got away.</h1>
      <p>That page isn’t in the collection. There’s still plenty to explore.</p>
      <Link className="mac-button mac-button-primary" href="/">
        Back to the collection
      </Link>
    </main>
  );
}
