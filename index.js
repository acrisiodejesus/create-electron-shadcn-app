#!/usr/bin/env node

import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const run = async () => {
  console.log(chalk.cyan(`\n✨ create-electron-shadcn-app\n`));

  const response = await prompts({
    type: "text",
    name: "projectName",
    message: "Project Name:",
    initial: "my-electron-app",
  });

  const { projectName } = response;
  const targetDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.resolve(__dirname, "template");

  if (fs.existsSync(targetDir)) {
    console.log(chalk.red(`\n❌ The directory ${projectName} already exist.`));
    process.exit(1);
  }

  await fs.copy(templateDir, targetDir);

  const pkgPath = path.join(targetDir, "package.json");

  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJSON(pkgPath);
    pkg.name = projectName;
    pkg.version = "0.1.0";
    pkg.description = "Project made by create-electron-shadcn-app";
    await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
  } else {
    throw new Error(`Package.json not found in ${pkgPath}`);
  }
  console.log(chalk.green(`\n✅ Your project was created in ./${projectName}`));
  console.log(chalk.yellow(`\n📦 Run the command:`));
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  console.log(`  npm start`);
};

run();
