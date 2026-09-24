import { notFound } from "next/navigation";
import { catalog, findItem } from "@/data/catalog";
import { PreviewRenderer } from "@/components/demos/PreviewRenderer";
export const metadata = { robots: { index: false, follow: false }, title: "Component preview" };
export function generateStaticParams() {
  return catalog.map(({ slug }) => ({ slug }));
}
export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!findItem(slug)) notFound();
  return <PreviewRenderer slug={slug} />;
}

export const dynamicParams = false;
