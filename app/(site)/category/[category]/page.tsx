import { notFound } from "next/navigation";
import { categories } from "@/data/catalog";
import { Catalog } from "@/components/catalog/Catalog";
export function generateStaticParams() {
  return categories.map(({ id }) => ({ category: id }));
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return { title: categories.find((c) => c.id === category)?.label ?? "Category not found" };
}
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const item = categories.find((c) => c.id === category);
  if (!item) notFound();
  return <Catalog category={item.id} />;
}

export const dynamicParams = false;
