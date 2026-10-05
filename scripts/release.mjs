// Packages the production build into release/, ready to copy to a server:
//
//   release/app/                     the app: run it with `node server.js`
//   release/<name>-<version>.tar.gz  the same folder, compressed
//
// Run it with `npm run release`, which builds first.
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const { name, version } = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const standalone = join(root, ".next", "standalone");

if (!existsSync(join(standalone, "server.js"))) {
  console.error('No standalone build found. Run "npm run release" (or "next build" with output: "standalone").');
  process.exit(1);
}

const releaseRoot = join(root, "release");
const appFolder = join(releaseRoot, "app");
const archive = join(releaseRoot, `${name}-${version}.tar.gz`);

rmSync(releaseRoot, { recursive: true, force: true });
mkdirSync(releaseRoot, { recursive: true });

// The server and its traced dependencies, then the files it serves as-is.
cpSync(standalone, appFolder, { recursive: true });
cpSync(join(root, ".next", "static"), join(appFolder, ".next", "static"), { recursive: true });

if (existsSync(join(root, "public"))) {
  cpSync(join(root, "public"), join(appFolder, "public"), { recursive: true });
}

cpSync(join(root, ".env.example"), join(appFolder, ".env.example"));

const tar = spawnSync("tar", ["-czf", archive, "-C", releaseRoot, "app"], { stdio: "inherit" });

if (tar.status !== 0) {
  console.error("Could not create the archive; the release/ folder is still ready to upload.");
  process.exit(1);
}

const megabytes = (statSync(archive).size / 1024 / 1024).toFixed(1);

console.log(`
Ready to deploy:
  release/app/  run with: node server.js (or npm start)
  release/${name}-${version}.tar.gz  ${megabytes} MB, the same folder to upload
`);
