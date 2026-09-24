import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { catalog, sources } from "@/data/catalog";
export const metadata = { title: "Getting started" };
export default function GettingStarted() {
  return (
    <div className="document-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">A LITTLE HELP TO GET YOU GOING</div>
          <h1>Find it. Try it. Make it yours.</h1>
          <p>Your next interface starts with one good component.</p>
        </div>
      </div>
      <p className="document-intro">
        Elements is a collection of {catalog.length} open-source React components from{" "}
        {sources.length} independent libraries. Everything runs locally, and every preview is built
        from the code you can copy.
      </p>
      <ol className="steps">
        <li>
          <h2>Find your starting point</h2>
          <p>
            Browse a category, filter by library, or search with <code>⌘ K</code> /{" "}
            <code>Ctrl K</code>. Hover over a card for a live preview. On a touch screen, tap its
            play button. Open the component to interact with it, change the preview width, or switch
            its theme.
          </p>
        </li>
        <li>
          <h2>Take the code with you</h2>
          <p>
            <strong>Copy code</strong> copies the file selected in the source viewer. Helper files,
            a working demo, styles, assets, and licenses are available in the same viewer. Keep the
            relative paths when adding them to your project.
          </p>
        </li>
        <li>
          <h2>Or let your coding assistant help</h2>
          <p>
            <strong>Copy for AI</strong> puts the complete example on your clipboard, along with its
            exact dependencies and setup instructions. Paste it into the coding assistant you
            already use and describe where you want the component. No account or API key is needed
            here.
          </p>
        </li>
        <li>
          <h2>Use your existing React project</h2>
          <p>
            The examples use React 19, TypeScript, and Tailwind CSS 4. Each component’s{" "}
            <strong>How to use</strong> tab lists its dependencies and installation command. Add the
            provided stylesheet to your Tailwind setup; place bundled sample artwork in your public
            directory. Examples work with plain React and do not require Next.js.
          </p>
        </li>
        <li>
          <h2>Keep the good things close</h2>
          <p>
            Use the bookmark button to build your own collection. Saved components and appearance
            preferences stay in this browser. They remain available after a refresh; they are not
            synced between devices.
          </p>
        </li>
        <li>
          <h2>Give the makers a little credit</h2>
          <p>
            Components are shared under the MIT license. Keep the original copyright and permission
            notices with copied code. Every component links to its original file and includes the
            exact license text. The Pacifico font used in Shape Hero has its own included font
            license.
          </p>
        </li>
      </ol>
      <Link className="mac-button mac-button-primary" href="/">
        Explore the collection <Icon name="forward" size={14} />
      </Link>
    </div>
  );
}
