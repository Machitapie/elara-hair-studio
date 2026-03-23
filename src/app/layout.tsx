import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elara Hair Studio | Oslo",
  description:
    "Oslos mest eksklusive hårstudio. Premium hårbehandlinger, farging og styling i hjertet av Frogner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
