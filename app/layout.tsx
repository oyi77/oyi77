import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muchammad Fikri Izzuddin - Lead Software Engineer",
  description: "Portfolio of Muchammad Fikri Izzuddin - Lead Software Engineer with 7+ years of experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}

