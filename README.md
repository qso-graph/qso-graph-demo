# qso-graph Demo

[![Live Demo](https://img.shields.io/badge/demo-live-22c55e?style=for-the-badge&logo=vercel)](https://qso-graph-demo.vercel.app/)
[![Docs](https://img.shields.io/badge/docs-qso--graph.io-3b82f6?style=for-the-badge)](https://qso-graph.io)

Interactive showcase of [qso-graph](https://github.com/qso-graph) MCP packages — connecting AI assistants to ham radio services.

**[View the live demo →](https://qso-graph-demo.vercel.app/)**

## Pages

| Page | What it shows | Data |
|------|--------------|------|
| **Dashboard** | Station overview, band conditions, QSO stats | 49,233 QSOs from KI7MT |
| **Physics Lab** | 18 operator-grounded propagation test paths | Cross-validated against 5.7M contest sigs |
| **DXCC Progress** | 271 worked / 246 confirmed, band×mode matrix | LoTW confirmations |
| **Path Analyzer** | Best times by band for specific paths | Pre-computed from log data |
| **Log Viewer** | Browse and filter QSOs | Sample from KI7MT log |

## MCP Tools Showcased

| Package | Tools | Auth |
|---------|-------|------|
| [eqsl-mcp](https://github.com/qso-graph/eqsl-mcp) | 5 tools | Persona (keyring) |
| [qrz-mcp](https://github.com/qso-graph/qrz-mcp) | 5 tools | XML session + API key |
| [lotw-mcp](https://github.com/qso-graph/lotw-mcp) | 5 tools | Persona (keyring) |
| [hamqth-mcp](https://github.com/qso-graph/hamqth-mcp) | 7 tools | Persona (keyring) |
| [pota-mcp](https://github.com/qso-graph/pota-mcp) | 7 tools | Public |
| [sota-mcp](https://github.com/qso-graph/sota-mcp) | 4 tools | Public |
| [solar-mcp](https://github.com/qso-graph/solar-mcp) | 6 tools | Public |
| [wspr-mcp](https://github.com/qso-graph/wspr-mcp) | 8 tools | Public |

## Stack

Next.js 15 · Tailwind v4 · TypeScript · Recharts · Vercel

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## License

MIT
