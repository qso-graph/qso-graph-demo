import { Card } from "@/components/Card";
import testPaths from "@/data/test-paths.json";

interface TestPath {
  id: string;
  name: string;
  band: string;
  tx_grid: string;
  rx_grid: string;
  hour_utc: number;
  month: number;
  sfi: number;
  kp: number;
  expected: string;
  confidence: string;
  evidence: string;
  qso_count: number | null;
  physics: string;
}

const tests = testPaths.tests as TestPath[];

function bandGroup(band: string): string {
  if (band === "10m") return "10m — The Acid Test Band";
  if (band === "15m") return "15m — Reliable DX";
  if (band === "20m") return "20m — Workhorse";
  if (band === "40m") return "40m — Night DX";
  if (band === "80m") return "80m — Domestic Night";
  if (band === "160m") return "160m — Top Band";
  if (band === "multi") return "Band Ordering — The Physics Test";
  return band;
}

function monthName(m: number): string {
  return [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][m];
}

const grouped = tests.reduce(
  (acc, t) => {
    const key = t.band;
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  },
  {} as Record<string, TestPath[]>
);

const bandOrder = ["10m", "15m", "20m", "40m", "80m", "160m", "multi"];

export default function PhysicsLab() {
  const positiveCount = tests.filter(
    (t) => t.expected === "positive"
  ).length;
  const negativeCount = tests.filter(
    (t) => t.expected === "negative"
  ).length;
  const orderCount = tests.filter((t) =>
    t.expected.startsWith("order")
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Physics Lab</h1>
        <p className="text-muted-foreground text-sm mt-1">
          18 operator-grounded test paths from 49,233 QSOs and 5.7M contest
          signatures. Each path is validated against ionospheric physics.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Must Open">
          <p className="text-2xl font-semibold font-mono text-open">
            {positiveCount}
          </p>
          <p className="text-xs text-muted-foreground">
            Paths actually worked
          </p>
        </Card>
        <Card title="Must Close">
          <p className="text-2xl font-semibold font-mono text-red-400">
            {negativeCount}
          </p>
          <p className="text-xs text-muted-foreground">Physics says no</p>
        </Card>
        <Card title="Band Order">
          <p className="text-2xl font-semibold font-mono text-accent">
            {orderCount}
          </p>
          <p className="text-xs text-muted-foreground">
            Day vs night ordering
          </p>
        </Card>
      </div>

      {bandOrder
        .filter((b) => grouped[b])
        .map((band) => (
          <Card key={band} title={bandGroup(band)}>
            <div className="space-y-4">
              {grouped[band].map((test) => (
                <div
                  key={test.id}
                  className="border border-border/50 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            test.expected === "positive"
                              ? "bg-open"
                              : test.expected === "negative"
                                ? "bg-red-400"
                                : "bg-accent"
                          }`}
                        />
                        <h4 className="font-medium text-sm">{test.name}</h4>
                        {test.id === "KI7MT-005" && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-red-400/15 text-red-400 rounded font-medium">
                            ACID TEST
                          </span>
                        )}
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            test.confidence === "hard"
                              ? "bg-accent/15 text-accent"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {test.confidence}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground font-mono">
                        {test.band !== "multi" && (
                          <>
                            <span>
                              {test.tx_grid} → {test.rx_grid}
                            </span>
                            <span>
                              {String(test.hour_utc).padStart(2, "0")}z{" "}
                              {monthName(test.month)}
                            </span>
                            <span>SFI {test.sfi}</span>
                            <span>Kp {test.kp}</span>
                          </>
                        )}
                        {test.qso_count !== null && (
                          <span className="text-foreground">
                            {test.qso_count} QSOs
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground italic">
                        &quot;{test.physics}&quot;
                      </p>

                      <p className="mt-1.5 text-xs text-muted-foreground">
                        {test.evidence}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-sm font-medium ${
                          test.expected === "positive"
                            ? "text-open"
                            : test.expected === "negative"
                              ? "text-red-400"
                              : "text-accent"
                        }`}
                      >
                        {test.expected === "positive"
                          ? "OPEN"
                          : test.expected === "negative"
                            ? "CLOSED"
                            : test.expected === "order_day"
                              ? "HIGH > LOW"
                              : "LOW > HIGH"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}

      <Card title="About These Tests">
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            These 18 paths are derived from KI7MT&apos;s 49,233 QSOs
            (2009-2025) cross-validated against 5.7 million contest signatures
            from 234 million CQ contest QSOs.
          </p>
          <p>
            <strong className="text-foreground">Hard gates</strong> are
            physics-dictated: the path either works or it doesn&apos;t, regardless
            of operating habits. 10m transatlantic at 2 AM is impossible — F2
            layer has collapsed.
          </p>
          <p>
            <strong className="text-foreground">Soft gates</strong> allow for
            operating habits — zero QSOs on 160m in summer might be antenna
            limitations, not physics.
          </p>
          <p>
            V22-gamma (production model) scores{" "}
            <strong className="text-foreground">16/17 hard pass</strong>. The
            one failure: KI7MT-005 (10m EU night) — the acid test.
          </p>
        </div>
      </Card>
    </div>
  );
}
