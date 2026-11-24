import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

try {
  const text = readFileSync(join(repoDir, "entry.txt"), "utf8").trimEnd();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text + "\n", "utf8");
} catch (err) {
  console.error("failed to write entry:", err.message);
  process.exit(1);
}
