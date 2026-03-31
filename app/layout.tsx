import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fauzan Lubada | Portfolio — Full-Stack Developer",
  description:
    "Premium interactive 3D portfolio of Fauzan Lubada. Full-Stack Developer & Data Enthusiast. Explore my workspace, projects, skills, and experience in an immersive Scandinavian-inspired environment.",
  keywords: [
    "Fauzan Lubada",
    "Portfolio",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Three.js",
    "3D Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Fauzan Lubada" }],
  openGraph: {
    title: "Fauzan Lubada | Interactive 3D Portfolio",
    description:
      "Explore my immersive 3D workspace portfolio. Full-Stack Developer & Data Enthusiast.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
