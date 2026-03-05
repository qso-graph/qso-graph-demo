import { Card } from "@/components/Card";
import { Stat } from "@/components/Stat";
import stats from "@/data/ki7mt-stats.json";
import dxcc from "@/data/dxcc-progress.json";

const bandStatus: Record<string, { status: string; label: string }> = {
  "10m": { status: "open", label: "EU / JA" },
  "12m": { status: "open", label: "SA / Pacific" },
  "15m": { status: "open", label: "All DX" },
  "17m": { status: "open", label: "All DX" },
  "20m": { status: "open", label: "24/7 Workhorse" },
  "30m": { status: "marginal", label: "CW / Data" },
  "40m": { status: "marginal", label: "Night DX" },
  "80m": { status: "closed", label: "Night Only" },
  "160m": { status: "closed", label: "Winter Night" },
};

const statusColor: Record<string, string> = {
  open: "bg-open",
  marginal: "bg-marginal",
  closed: "bg-closed",
};

const statusText: Record<string, string> = {
  open: "text-open",
  marginal: "text-marginal",
  closed: "text-muted-foreground",
};

export default function Dashboard() {
  const topCountries = Object.entries(stats.top_countries).slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          KI7MT station overview — 49,233 QSOs from DN46 (historical) / DN13
          (current)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          title="Current Conditions"
          subtitle="Simulated — wire to solar-mcp for live data"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat label="SFI" value={156} trend="up" />
            <Stat label="Kp" value={2} trend="neutral" />
            <Stat label="A Index" value={8} />
            <Stat label="Bz" value={-2} unit="nT" />
          </div>
        </Card>

        <Card title="Band Status" subtitle="Based on current solar conditions">
          <div className="space-y-1.5">
            {Object.entries(bandStatus).map(([band, { status, label }]) => (
              <div key={band} className="flex items-center gap-2 text-sm">
                <span className="w-10 font-mono text-muted-foreground">
                  {band}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${statusColor[status]}`}
                    style={{
                      width:
                        status === "open"
                          ? "85%"
                          : status === "marginal"
                            ? "50%"
                            : "15%",
                    }}
                  />
                </div>
                <span
                  className={`text-xs w-28 text-right ${statusText[status]}`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card title="Total QSOs">
          <Stat label="" value={stats.total_qsos} />
        </Card>
        <Card title="DXCC Worked">
          <Stat label="" value={stats.dxcc_count} />
        </Card>
        <Card title="DXCC Confirmed">
          <Stat label="" value={dxcc.dxcc_count} />
        </Card>
        <Card title="Grids Worked">
          <Stat label="" value={stats.grids_count} />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="QSOs by Band">
          <div className="space-y-1">
            {Object.entries(stats.bands)
              .filter(([b]) => !["6m", "60m"].includes(b))
              .map(([band, count]) => (
                <div key={band} className="flex items-center gap-2 text-sm">
                  <span className="w-10 font-mono text-muted-foreground">
                    {band}
                  </span>
                  <div className="flex-1 h-3 bg-muted rounded overflow-hidden">
                    <div
                      className="h-full bg-accent/70 rounded"
                      style={{
                        width: `${(count / stats.bands["20m"]) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-14 text-right font-mono text-xs text-muted-foreground">
                    {count.toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </Card>

        <Card title="Top Countries">
          <div className="space-y-1">
            {topCountries.map(([country, count]) => (
              <div key={country} className="flex items-center gap-2 text-sm">
                <span className="flex-1 truncate">{country}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {(count as number).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Recent QSOs" subtitle="Last 20 from log">
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
              {stats.sample_qsos.map((qso, i) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
