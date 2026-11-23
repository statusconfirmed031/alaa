import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fino International — Company Profile 2025–2026",
  description:
    "Fino International company profile, project portfolio, locations, facilities, milestones, and recognition.",
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
