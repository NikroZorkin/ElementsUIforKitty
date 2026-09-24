import { notFound } from "next/navigation";
import { catalog, findItem } from "@/data/catalog";
import { getBundle, getHighlightedFiles } from "@/lib/catalog";
import { ComponentDetail } from "@/components/detail/ComponentDetail";
export function generateStaticParams() {
  return catalog.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findItem(slug);
  return { title: item?.title ?? "Component not found", description: item?.description };
}
export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params,
    item = findItem(slug);
  if (!item) notFound();
  const [bundle, files] = await Promise.all([getBundle(slug), getHighlightedFiles(slug)]);
  return <ComponentDetail item={item} bundle={bundle} files={files} />;
}

export const dynamicParams = false;
