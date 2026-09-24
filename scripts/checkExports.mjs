import { readFile, writeFile, mkdir, mkdtemp } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";
import ts from "typescript";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const entries = JSON.parse(await readFile("data/entries.json", "utf8"));
await mkdir(".export-check", { recursive: true });
const fixture = await mkdtemp(".export-check/run-"),
  apps = [];
for (const entry of entries) {
  const bundle = JSON.parse(await readFile(`data/generated/${entry.slug}.json`, "utf8"));
  const directory = path.resolve(fixture, entry.slug);
  for (const file of bundle.files) {
    if (file.path.startsWith("/") || file.path.split("/").includes(".."))
      throw Error("Unsafe export path");
    const destination = path.join(directory, file.path);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, file.content);
  }
  const app = path.join(directory, "App.tsx");
  apps.push(app);
  // Resolve the actual copied files in an isolated directory. Only declared
  // packages are external; undeclared package imports fail the bundle.
  await build({
    entryPoints: [app],
    bundle: true,
    write: false,
    platform: "browser",
    format: "esm",
    jsx: "automatic",
    logLevel: "silent",
    external: [...Object.keys(bundle.dependencies), "tailwindcss"],
    loader: { ".css": "empty" },
  });
  const cssPath = path.join(directory, "registry/demo.css");
  await postcss([tailwind({ base: directory, optimize: true })]).process(
    await readFile(cssPath, "utf8"),
    { from: cssPath },
  );
}
const program = ts.createProgram(apps, {
  strict: true,
  noEmit: true,
  jsx: ts.JsxEmit.ReactJSX,
  target: ts.ScriptTarget.ES2017,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  skipLibCheck: true,
  esModuleInterop: true,
  allowSyntheticDefaultImports: true,
  types: ["react", "react-dom"],
  lib: ["lib.es2022.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
});
const diagnostics = ts.getPreEmitDiagnostics(program);
if (diagnostics.length) {
  console.error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (f) => f,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => "\n",
    }),
  );
  process.exitCode = 1;
} else
  console.log(
    `✓ All ${entries.length} exported examples bundle, type-check, and compile their Tailwind stylesheet outside the catalog.`,
  );
