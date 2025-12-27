import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaijoOS - Portfolio of Muchammad Fikri Izzuddin",
  description: "Portfolio of Muchammad Fikri Izzuddin - Lead Software Engineer with 7+ years of experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

