import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

try {
  const text = readFileSync(join(repoDir, "entry.txt"), "utf8").trimEnd();
  // The gate only accepts 1-200 characters: refuse to emit an invalid entry.
  if (text.length < 1 || text.length > 200) {
    console.error("entry must be 1-200 characters, got " + text.length);
    process.exit(1);
  }
  // The entry must be a single line: reject any embedded newline.
  if (text.includes("\n")) {
    console.error("entry must be a single line");
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text + "\n", "utf8");
} catch (err) {
  console.error("failed to write entry:", err.message);
  process.exit(1);
}
