import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KurwaCoach",
    short_name: "KurwaCoach",
    description: "Learn Polish the hard way",
    start_url: "/learn",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#DC2626",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
