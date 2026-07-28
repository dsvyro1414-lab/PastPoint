import type { Metadata } from "next";
import "@photo-sphere-viewer/core/index.css";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "PastPoint — Explore history",
  description:
    "Explore immersive historical scenes and discover what happened, where, and when.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
