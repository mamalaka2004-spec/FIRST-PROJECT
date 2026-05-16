#!/usr/bin/env bash
# Install the TradingView MCP server (LewisWJackson/tradingview-mcp-jackson)
# next to this repo and print the MCP config snippet you need on your local box.
#
# Usage: bash scripts/install-tradingview-mcp.sh
#
# Requires: git, node 18+, npm. The MCP itself requires TradingView Desktop
# (paid subscription) running with --remote-debugging-port=9222.

set -euo pipefail

REPO_URL="https://github.com/LewisWJackson/tradingview-mcp-jackson.git"
TARGET_DIR="$(cd "$(dirname "$0")/.." && pwd)/tradingview-mcp-jackson"

echo "==> Target directory: $TARGET_DIR"

if [ -d "$TARGET_DIR/.git" ]; then
  echo "==> Already cloned. Pulling latest…"
  git -C "$TARGET_DIR" pull --ff-only
else
  echo "==> Cloning $REPO_URL"
  git clone --depth 1 "$REPO_URL" "$TARGET_DIR"
fi

echo "==> Checking node / npm"
command -v node >/dev/null || { echo "node not found (need >=18)"; exit 1; }
command -v npm  >/dev/null || { echo "npm not found"; exit 1; }
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "node $NODE_MAJOR is too old; need >=18"; exit 1
fi

echo "==> Installing dependencies"
(cd "$TARGET_DIR" && npm install --no-audit --no-fund)

if [ -f "$TARGET_DIR/rules.example.json" ] && [ ! -f "$TARGET_DIR/rules.json" ]; then
  echo "==> Seeding rules.json from rules.example.json"
  cp "$TARGET_DIR/rules.example.json" "$TARGET_DIR/rules.json"
fi

SERVER_JS="$TARGET_DIR/src/server.js"

cat <<EOF

==> Install complete.

Server entrypoint:
  $SERVER_JS

Add this to ~/.claude/.mcp.json (or merge into existing mcpServers):

{
  "mcpServers": {
    "tradingview": {
      "command": "node",
      "args": ["$SERVER_JS"]
    }
  }
}

Then launch TradingView Desktop with the debug port open. The upstream repo
ships platform-specific launchers under tradingview-mcp-jackson/scripts/:

  Linux:   tradingview-mcp-jackson/scripts/launch_tv_debug_linux.sh
  macOS:   tradingview-mcp-jackson/scripts/launch_tv_debug_mac.sh
  Windows: tradingview-mcp-jackson/scripts/launch_tv_debug.bat

Note: this MCP server only works when TradingView Desktop is running on the
same machine — it talks to it via Chrome DevTools Protocol on port 9222.
EOF
