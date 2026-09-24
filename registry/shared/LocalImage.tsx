/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
/* Framework-independent adapter for the original demos' image props. */
import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  quality?: number;
};
export default function LocalImage({
  fill,
  priority,
  unoptimized,
  quality,
  style,
  alt = "",
  ...props
}: Props) {
  void unoptimized;
  void quality;
  return (
    <img
      {...props}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      style={{
        ...(fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : {}),
        ...style,
      }}
    />
  );
}
