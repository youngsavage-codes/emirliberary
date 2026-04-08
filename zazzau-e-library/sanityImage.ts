import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client"; // your Sanity client

const builder = imageUrlBuilder(client);

export function urlFor(source: any): string {
  if (!source) return "/placeholder.jpg"; // fallback
  // check if source is already a URL string
  if (typeof source === "string") return source;
  try {
    return builder.image(source).url() || "/placeholder.jpg";
  } catch (err) {
    console.error("Sanity image build error:", err);
    return "/placeholder.jpg";
  }
}
