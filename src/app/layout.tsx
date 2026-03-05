import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "qso-graph — Ham Radio MCP Tools",
  description:
    "44 MCP tools across 9 packages connecting AI assistants to ham radio services. eQSL, QRZ, Club Log, LoTW, HamQTH, POTA, SOTA, space weather, and WSPR analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <footer className="border-t border-border mt-12 py-6 text-center text-muted-foreground text-sm">
          <p>
            qso-graph — Open-source MCP servers for ham radio.{" "}
            <a
              href="https://github.com/qso-graph"
              className="text-accent hover:underline"
            >
              GitHub
            </a>{" "}
            ·{" "}
            <a
              href="https://qso-graph.io"
              className="text-accent hover:underline"
            >
              Docs
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
