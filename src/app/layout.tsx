import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PACT — Save Together",
  description: "Make saving social. Friends commit together, hold each other accountable, and turn successful days into savings.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
