import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WMINFRA Interior finishing contractors — Company Profile 2025–2026",
  description:
    "WMINFRA Interior finishing contractors company profile, project portfolio, locations, facilities, milestones, and recognition.",
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
