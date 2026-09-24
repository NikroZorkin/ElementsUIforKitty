/** Original example artwork and composition. Copyright (c) 2026 NikroZorkin. MIT. */
export const artworks = [
  {
    id: "contours",
    title: "Quiet contours",
    src: "/media/art-01.svg",
    description: "A study in soft, repeating lines.",
  },
  {
    id: "orbit",
    title: "In orbit",
    src: "/media/art-02.svg",
    description: "Small shapes finding their balance.",
  },
  {
    id: "field",
    title: "Open field",
    src: "/media/art-03.svg",
    description: "A little room to wander.",
  },
  {
    id: "sunset",
    title: "After hours",
    src: "/media/art-04.svg",
    description: "Warm light at the end of the day.",
  },
  {
    id: "glass",
    title: "Soft focus",
    src: "/media/art-05.svg",
    description: "Light, layers, and a change of perspective.",
  },
  {
    id: "paper",
    title: "Paper studies",
    src: "/media/art-06.svg",
    description: "Collected shapes from the studio.",
  },
];

export function ArtTile({ index = 0 }: { index?: number }) {
  const art = artworks[index % artworks.length];
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-2xl border bg-background">
      <img
        src={art.src}
        alt={art.title}
        className="h-32 min-h-0 flex-1 w-full object-cover"
        width={400}
        height={280}
      />
      <figcaption className="shrink-0 p-3">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Studio collection
        </p>
        <h3 className="mt-1 font-medium text-base">{art.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{art.description}</p>
      </figcaption>
    </figure>
  );
}
