"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="error-page">
      <h1>Something needs a fresh start.</h1>
      <p>We couldn’t load this page. Try opening it again.</p>
      <button className="mac-button mac-button-primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
