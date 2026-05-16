# FIRST-PROJECT

Two things live here:

1. **`dashboard/index.html`** — a self-contained swing-trade signals dashboard
   for crypto. Pulls live data from CoinGecko (no API key), computes RSI,
   moving-average trend, Bollinger position, and ATR client-side, and produces
   a STRONG BUY / BUY / NEUTRAL / SELL / STRONG SELL verdict per coin with
   the evidence behind it. Includes a localStorage-backed watchlist so you can
   add coins outside the top-25.

2. **`scripts/install-tradingview-mcp.sh`** — installer for
   [`LewisWJackson/tradingview-mcp-jackson`](https://github.com/LewisWJackson/tradingview-mcp-jackson),
   an MCP server that drives **TradingView Desktop** via Chrome DevTools
   Protocol. The MCP requires a paid TradingView subscription and the desktop
   app running on the same machine — it cannot be exercised from a remote
   container. Install and run it on your own box.

## Open the dashboard

No build step. Just open the file in a browser:

```
open dashboard/index.html       # macOS
xdg-open dashboard/index.html   # Linux
start dashboard/index.html      # Windows
```

Or serve it locally if your browser blocks `file://` fetches:

```
python3 -m http.server -d dashboard 8080
# then visit http://localhost:8080
```

### What you get

- **Top 25 by market cap** auto-refreshed every 60s.
- **Watchlist** — type any coin name/symbol, press Add. Persists in localStorage.
- **Filter pills**: All / Long setups / Short setups / Neutral.
- **Click a row** to expand the "Why" panel: evidence bullets behind the
  verdict, plus indicative long-entry / mean-reversion / short-entry levels
  (from the 20-day Bollinger bands).
- **Sortable columns**, sparkline, color-coded RSI/Bollinger.

### Signal logic (transparent, rule-based)

Score from −4 to +4:

| Condition | Score |
|---|---|
| RSI(14) < 30 | +2 |
| RSI(14) 30–45 | +1 |
| RSI(14) 55–70 | −1 |
| RSI(14) > 70 | −2 |
| Price ≤ lower Bollinger (20, 2σ) | +1 |
| Price ≥ upper Bollinger (20, 2σ) | −1 |
| SMA20 > SMA50 | +1 |
| SMA20 < SMA50 | −1 |
| 7d drop ≥ 10% with RSI < 40 | +1 |
| 7d rally ≥ 15% with RSI > 60 | −1 |

Mapping: ≥+3 STRONG BUY, +1/+2 BUY, 0 NEUTRAL, −1/−2 SELL, ≤−3 STRONG SELL.

This is decision support, not financial advice — verify before trading.

## Install the TradingView MCP server (local machine only)

```
bash scripts/install-tradingview-mcp.sh
```

The script clones the upstream repo to `./tradingview-mcp-jackson/` (gitignored),
runs `npm install`, and prints the `~/.claude/.mcp.json` snippet you need.
You'll also need to launch TradingView Desktop with the debug port open —
the upstream ships launchers under `tradingview-mcp-jackson/scripts/` for
macOS, Windows, and Linux.

The MCP server only works while TradingView Desktop is running on the same
machine; it talks to it over Chrome DevTools Protocol on port 9222.
