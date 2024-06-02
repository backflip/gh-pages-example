import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { marked } from "marked";

const inputDir = resolve(import.meta.dirname, "..");
const outputDir = resolve(inputDir, "../dist");

async function createHtml() {
  const inputPath = resolve(inputDir, "README.md");
  const outputPath = resolve(outputDir, "index.html");

  const input = await readFile(inputPath, "utf-8");

  const output = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Title</title>
<link rel="stylesheet" href="assets/styles.css">
</head>
<body>
${marked(input)}
</body>
</html>`;

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output);
}

async function copyDirectory(dir) {
  const inputPath = resolve(inputDir, dir);
  const outputPath = resolve(outputDir, dir);

  await cp(inputPath, outputPath, { recursive: true });
}

await rm(outputDir, {
  recursive: true,
  force: true,
});

await createHtml();

await copyDirectory("files");
await copyDirectory("assets");
