import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elara Hair Studio — Premium Hair Salon",
  description:
    "Experience the art of beautiful hair at Elara Hair Studio. Expert stylists, luxurious treatments, and a warm atmosphere await you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
