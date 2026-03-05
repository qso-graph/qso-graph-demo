"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/physics", label: "Physics Lab" },
  { href: "/dxcc", label: "DXCC Progress" },
  { href: "/path", label: "Path Analyzer" },
  { href: "/log", label: "Log Viewer" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">
              qso-graph
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              MCP Demo
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {links.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    active
                      ? "bg-accent/15 text-accent font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="text-sm text-muted-foreground hidden md:block">
            <span className="text-foreground font-mono">KI7MT</span>
            <span className="mx-1.5 text-border">|</span>
            <span className="font-mono">DN13</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
