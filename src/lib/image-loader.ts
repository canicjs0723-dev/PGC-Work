// Used only for the GitHub Pages static export: serves the original file from /public under the base path.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}`;
}
