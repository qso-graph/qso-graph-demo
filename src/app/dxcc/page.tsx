import { Card } from "@/components/Card";
import { Stat } from "@/components/Stat";
import stats from "@/data/ki7mt-stats.json";
import dxcc from "@/data/dxcc-progress.json";

const HF_BANDS = [
  "160m",
  "80m",
  "60m",
  "40m",
  "30m",
  "20m",
  "17m",
  "15m",
  "12m",
  "10m",
];
const MODES = ["CW", "SSB", "DATA"];

export default function DxccProgress() {
  const worked = stats.dxcc_count;
  const confirmed = dxcc.dxcc_count;
  const pending = worked - confirmed;
  const needed = 340 - worked;
  const pct = Math.round((worked / 340) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">DXCC Progress</h1>
        <p className="text-muted-foreground text-sm mt-1">
          KI7MT — {worked} of 340 DXCC entities worked, {confirmed} confirmed
          via LoTW
        </p>
      </div>

      {/* Progress bar */}
      <Card title="Overall Progress">
        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <span className="text-3xl font-semibold font-mono">
              {worked}
              <span className="text-lg text-muted-foreground"> / 340</span>
            </span>
            <span className="text-sm text-muted-foreground">{pct}%</span>
          </div>
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <div className="h-full flex">
              <div
                className="bg-open h-full"
                style={{ width: `${(confirmed / 340) * 100}%` }}
                title={`${confirmed} confirmed`}
              />
              <div
                className="bg-accent h-full"
                style={{ width: `${(pending / 340) * 100}%` }}
                title={`${pending} pending`}
              />
            </div>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-open inline-block" />
              Confirmed ({confirmed})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-accent inline-block" />
              Pending ({pending})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-muted inline-block" />
              Needed ({needed})
            </span>
          </div>
        </div>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card title="Worked">
          <Stat label="" value={worked} />
        </Card>
        <Card title="Confirmed">
          <Stat label="" value={confirmed} />
        </Card>
        <Card title="Pending">
          <Stat label="" value={pending} />
        </Card>
        <Card title="Needed">
          <Stat label="" value={needed} />
        </Card>
      </div>

      {/* DXCC by Band */}
      <Card
        title="DXCC Confirmed by Band"
        subtitle="LoTW confirmations per band"
      >
        <div className="space-y-1.5">
          {HF_BANDS.filter(
            (b) => dxcc.band_totals[b as keyof typeof dxcc.band_totals]
          ).map((band) => {
            const count =
              dxcc.band_totals[band as keyof typeof dxcc.band_totals] ?? 0;
            const maxBand = Math.max(
              ...Object.values(dxcc.band_totals).map(Number)
            );
            return (
              <div key={band} className="flex items-center gap-2 text-sm">
                <span className="w-10 font-mono text-muted-foreground">
                  {band}
                </span>
                <div className="flex-1 h-3 bg-muted rounded overflow-hidden">
                  <div
                    className="h-full bg-open/70 rounded"
                    style={{ width: `${(count / maxBand) * 100}%` }}
                  />
                </div>
                <span className="w-10 text-right font-mono text-xs text-muted-foreground">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Band x Mode Matrix */}
      <Card
        title="Band x Mode Matrix"
        subtitle="DXCC confirmed per band and mode combination"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground text-xs">
                <th className="pb-2 pr-4">Band</th>
                {MODES.map((mode) => (
                  <th key={mode} className="pb-2 pr-4 text-center w-20">
                    {mode}
                  </th>
                ))}
                <th className="pb-2 text-center w-20">Total</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {HF_BANDS.filter(
                (b) => dxcc.matrix[b as keyof typeof dxcc.matrix]
              ).map((band) => {
                const row =
                  dxcc.matrix[band as keyof typeof dxcc.matrix] ?? {};
                const total = MODES.reduce(
                  (sum, m) =>
                    sum + ((row as Record<string, number>)[m] ?? 0),
                  0
                );
                return (
                  <tr
                    key={band}
                    className="border-t border-border/50 hover:bg-muted/50"
                  >
                    <td className="py-1.5 pr-4 text-muted-foreground">
                      {band}
                    </td>
                    {MODES.map((mode) => {
                      const val =
                        (row as Record<string, number>)[mode] ?? 0;
                      return (
                        <td key={mode} className="py-1.5 pr-4 text-center">
                          <span
                            className={
                              val > 100
                                ? "text-open"
                                : val > 50
                                  ? "text-accent"
                                  : val > 0
                                    ? "text-muted-foreground"
                                    : "text-border"
                            }
                          >
                            {val || "—"}
                          </span>
                        </td>
                      );
                    })}
                    <td className="py-1.5 text-center text-foreground font-medium">
                      {total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top Entities */}
      <Card
        title="Top DXCC Entities"
        subtitle="Most QSOs confirmed via LoTW"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground text-xs">
                <th className="pb-2 pr-4 w-8">#</th>
                <th className="pb-2 pr-4">Entity</th>
                <th className="pb-2 pr-4 text-right">DXCC</th>
                <th className="pb-2 text-right">QSOs</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {dxcc.top_entities.map(
                (
                  entity: { dxcc: number; name: string; qsos: number },
                  i: number
                ) => (
                  <tr
                    key={entity.dxcc}
                    className="border-t border-border/50 hover:bg-muted/50"
                  >
                    <td className="py-1.5 pr-4 text-muted-foreground">
                      {i + 1}
                    </td>
                    <td className="py-1.5 pr-4 capitalize">
                      {entity.name.toLowerCase()}
                    </td>
                    <td className="py-1.5 pr-4 text-right text-muted-foreground">
                      {entity.dxcc}
                    </td>
                    <td className="py-1.5 text-right">
                      {entity.qsos.toLocaleString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mode totals */}
      <Card title="DXCC by Mode" subtitle="Unique entities confirmed per mode">
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(dxcc.mode_totals).map(([mode, count]) => (
            <div key={mode} className="text-center">
              <p className="text-2xl font-semibold font-mono">{count as number}</p>
              <p className="text-xs text-muted-foreground">{mode}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
