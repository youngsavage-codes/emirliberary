import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // your project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", // dataset name
  apiVersion: "2025-10-25", // use current date for versioning
  useCdn: false, // `true` for fast, cached queries; false for fresh content
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // only needed for write operations (create, update, delete)
});
