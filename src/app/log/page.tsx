"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/Card";
import stats from "@/data/ki7mt-stats.json";

const BANDS = [
  "All",
  "160m",
  "80m",
  "40m",
  "30m",
  "20m",
  "17m",
  "15m",
  "12m",
  "10m",
];
const MODES = ["All", "CW", "SSB", "DATA"];

export default function LogViewer() {
  const [search, setSearch] = useState("");
  const [bandFilter, setBandFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");

  const filtered = useMemo(() => {
    return stats.sample_qsos.filter((qso) => {
      if (search && !qso.call.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (bandFilter !== "All" && qso.band !== bandFilter) return false;
      if (modeFilter !== "All" && qso.mode !== modeFilter) return false;
      return true;
    });
  }, [search, bandFilter, modeFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Log Viewer</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Browse and search QSOs. Showing sample of 20 from 49,233 total.
        </p>
      </div>

      {/* Filters */}
      <Card title="Filters">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              Search callsign
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. JA7NI"
              className="bg-muted border border-border rounded px-3 py-1.5 text-sm font-mono text-foreground w-40 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              Band
            </label>
            <div className="flex gap-1">
              {BANDS.map((b) => (
                <button
                  key={b}
                  onClick={() => setBandFilter(b)}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                    b === bandFilter
                      ? "bg-accent/15 text-accent"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              Mode
            </label>
            <div className="flex gap-1">
              {MODES.map((m) => (
                <button
                  key={m}
                  onClick={() => setModeFilter(m)}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                    m === modeFilter
                      ? "bg-accent/15 text-accent"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card
        title={`Results — ${filtered.length} QSOs`}
        subtitle="Sample data from KI7MT log"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground text-xs">
                <th className="pb-2 pr-4">Date</th>
                <th className="pb-2 pr-4">Time</th>
                <th className="pb-2 pr-4">Call</th>
                <th className="pb-2 pr-4">Band</th>
                <th className="pb-2 pr-4">Mode</th>
                <th className="pb-2 pr-4">Grid</th>
                <th className="pb-2">Country</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No matching QSOs in sample data
                  </td>
                </tr>
              ) : (
                filtered.map((qso, i) => (
                  <tr
                    key={i}
                    className="border-t border-border/50 hover:bg-muted/50"
                  >
                    <td className="py-1.5 pr-4 text-muted-foreground">
                      {qso.date}
                    </td>
                    <td className="py-1.5 pr-4 text-muted-foreground">
                      {qso.time}
                    </td>
                    <td className="py-1.5 pr-4 text-accent">{qso.call}</td>
                    <td className="py-1.5 pr-4">{qso.band}</td>
                    <td className="py-1.5 pr-4">{qso.mode}</td>
                    <td className="py-1.5 pr-4 text-muted-foreground">
                      {qso.grid}
                    </td>
                    <td className="py-1.5 text-muted-foreground">
                      {qso.country}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="QSOs by Mode">
          {Object.entries(stats.modes).map(([mode, count]) => (
            <div key={mode} className="flex justify-between text-sm py-0.5">
              <span className="text-muted-foreground">{mode}</span>
              <span className="font-mono">{count.toLocaleString()}</span>
            </div>
          ))}
        </Card>
        <Card title="QSOs by Band (Top 5)">
          {Object.entries(stats.bands)
            .slice(0, 5)
            .map(([band, count]) => (
              <div key={band} className="flex justify-between text-sm py-0.5">
                <span className="font-mono text-muted-foreground">{band}</span>
                <span className="font-mono">{count.toLocaleString()}</span>
              </div>
            ))}
        </Card>
        <Card title="Active Period">
          <p className="text-sm">
            <span className="text-muted-foreground">First QSO:</span>{" "}
            <span className="font-mono">{stats.date_range.start}</span>
          </p>
          <p className="text-sm mt-1">
            <span className="text-muted-foreground">Last QSO:</span>{" "}
            <span className="font-mono">{stats.date_range.end}</span>
          </p>
          <p className="text-sm mt-1">
            <span className="text-muted-foreground">Total:</span>{" "}
            <span className="font-mono">
              {stats.total_qsos.toLocaleString()} QSOs
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
}
