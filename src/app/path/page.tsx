"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { Stat } from "@/components/Stat";
import stats from "@/data/ki7mt-stats.json";

interface PathResult {
  band: string;
  bestWindow: string;
  qsoCount: number;
  confidence: number;
}

// Pre-computed demo paths from KI7MT's log
const demoPaths: Record<string, { distance: number; results: PathResult[] }> = {
  "DN46→JN48": {
    distance: 8234,
    results: [
      { band: "10m", bestWindow: "14:00–18:00", qsoCount: 170, confidence: 80 },
      { band: "15m", bestWindow: "13:00–20:00", qsoCount: 568, confidence: 95 },
      { band: "20m", bestWindow: "12:00–22:00", qsoCount: 1760, confidence: 100 },
      { band: "40m", bestWindow: "00:00–08:00", qsoCount: 287, confidence: 75 },
      { band: "80m", bestWindow: "02:00–06:00", qsoCount: 12, confidence: 20 },
    ],
  },
  "DN46→PM95": {
    distance: 7890,
    results: [
      { band: "10m", bestWindow: "20:00–01:00", qsoCount: 198, confidence: 70 },
      { band: "15m", bestWindow: "16:00–00:00", qsoCount: 301, confidence: 85 },
      { band: "20m", bestWindow: "14:00–02:00", qsoCount: 783, confidence: 95 },
      { band: "40m", bestWindow: "06:00–14:00", qsoCount: 585, confidence: 90 },
      { band: "80m", bestWindow: "08:00–12:00", qsoCount: 34, confidence: 30 },
    ],
  },
  "DN46→FN20": {
    distance: 3180,
    results: [
      { band: "10m", bestWindow: "16:00–20:00", qsoCount: 245, confidence: 75 },
      { band: "15m", bestWindow: "14:00–22:00", qsoCount: 412, confidence: 90 },
      { band: "20m", bestWindow: "12:00–00:00", qsoCount: 761, confidence: 100 },
      { band: "40m", bestWindow: "00:00–06:00", qsoCount: 320, confidence: 80 },
      { band: "80m", bestWindow: "02:00–08:00", qsoCount: 89, confidence: 50 },
      { band: "160m", bestWindow: "03:00–07:00", qsoCount: 42, confidence: 35 },
    ],
  },
  "DN46→CN87": {
    distance: 890,
    results: [
      { band: "20m", bestWindow: "16:00–22:00", qsoCount: 471, confidence: 95 },
      { band: "40m", bestWindow: "00:00–08:00", qsoCount: 210, confidence: 85 },
      { band: "80m", bestWindow: "02:00–08:00", qsoCount: 69, confidence: 60 },
      { band: "160m", bestWindow: "03:00–07:00", qsoCount: 76, confidence: 55 },
    ],
  },
};

const gridLabels: Record<string, string> = {
  DN46: "Montana (historical)",
  JN48: "Germany",
  PM95: "Japan",
  FN20: "New York",
  CN87: "Portland, OR",
};

export default function PathAnalyzer() {
  const [selectedPath, setSelectedPath] = useState("DN46→PM95");
  const path = demoPaths[selectedPath];
  const [from, to] = selectedPath.split("→");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Path Analyzer</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Propagation analysis for specific paths. Demo uses pre-computed data
          from KI7MT&apos;s log — wire to ionis-mcp for live analysis.
        </p>
      </div>

      {/* Path selector */}
      <Card title="Select Path">
        <div className="flex flex-wrap gap-2">
          {Object.keys(demoPaths).map((p) => {
            const [f, t] = p.split("→");
            return (
              <button
                key={p}
                onClick={() => setSelectedPath(p)}
                className={`px-3 py-1.5 rounded text-sm font-mono transition-colors ${
                  p === selectedPath
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : "bg-muted text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                {f} → {t}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Path header */}
      <div className="grid grid-cols-3 gap-4">
        <Card title="From">
          <p className="text-lg font-mono font-semibold">{from}</p>
          <p className="text-xs text-muted-foreground">
            {gridLabels[from] || from}
          </p>
        </Card>
        <Card title="Distance">
          <Stat label="" value={path.distance.toLocaleString()} unit="km" />
        </Card>
        <Card title="To">
          <p className="text-lg font-mono font-semibold">{to}</p>
          <p className="text-xs text-muted-foreground">
            {gridLabels[to] || to}
          </p>
        </Card>
      </div>

      {/* Band results */}
      <Card
        title="Best Times by Band"
        subtitle={`Current conditions: SFI 156 — ${stats.total_qsos.toLocaleString()} QSOs in reference log`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground text-xs">
                <th className="pb-2 pr-4">Band</th>
                <th className="pb-2 pr-4">Best Window (UTC)</th>
                <th className="pb-2 pr-4 text-right">Your QSOs</th>
                <th className="pb-2 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {path.results.map((r) => (
                <tr
                  key={r.band}
                  className="border-t border-border/50 hover:bg-muted/50"
                >
                  <td className="py-2 pr-4">{r.band}</td>
                  <td className="py-2 pr-4 text-accent">{r.bestWindow}</td>
                  <td className="py-2 pr-4 text-right">
                    {r.qsoCount.toLocaleString()}
                  </td>
                  <td className="py-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            r.confidence >= 80
                              ? "bg-open"
                              : r.confidence >= 50
                                ? "bg-accent"
                                : "bg-closed"
                          }`}
                          style={{ width: `${r.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs w-8">
                        {r.confidence}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="MCP Integration Note">
        <p className="text-sm text-muted-foreground">
          In production, this page calls{" "}
          <code className="text-accent text-xs">ionis-mcp:path_analysis</code>{" "}
          and{" "}
          <code className="text-accent text-xs">ionis-mcp:band_openings</code>{" "}
          with live data from 175M+ propagation signatures. The demo shows
          pre-computed results from the KI7MT log.
        </p>
      </Card>
    </div>
  );
}
