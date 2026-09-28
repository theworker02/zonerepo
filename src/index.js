
function readInput(fallback) {
  if (fallback != null && String(fallback).length) return String(fallback);
  if (process.stdin && process.stdin.isTTY) return "";
  try {
    const fs = require("fs");
    if (typeof fs.readFileSync === "function") {
      // Non-blocking when no piped data: use readFileSync only if fd 0 has size or isn't a TTY.
      return fs.readFileSync(0, "utf8");
    }
  } catch (_) {}
  return "";
}

function isIpv4(s) {
  const p = String(s).split(".");
  return p.length === 4 && p.every(x => /^\d+$/.test(x) && Number(x) >= 0 && Number(x) <= 255);
}
function hostport(s) {
  const m = String(s).match(/^\[?([^\]]+?)\]?(?::(\d+))?$/);
  if (!m) throw new Error("bad hostport");
  return { host: m[1], port: m[2] ? Number(m[2]) : null };
}
function run(argv) {
  const mode = argv[0] || "ipv4";
  if (mode === "hostport") return JSON.stringify(hostport(argv[1] || "127.0.0.1:8080"));
  return String(isIpv4(argv[1] || argv[0] || "1.2.3.4"));
}

module.exports = { readInput, isIpv4, hostport, run };
