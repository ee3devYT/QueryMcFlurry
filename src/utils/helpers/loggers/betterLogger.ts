import chalk from "chalk";

type LogLevel = "log" | "info" | "success" | "warn" | "error";

interface BetterLogOptions {
  center?: boolean;
  level?: LogLevel;
}

const colorFunctions = {
  log: (text: string) => text,
  info: chalk.blueBright,
  success: chalk.greenBright,
  warn: chalk.yellowBright,
  error: chalk.redBright,
};

function getConsoleWidth(): number {
  try {
    return process.stdout.columns;
  } catch {
    return 80;
  }
}

export function logger(message: string, options: BetterLogOptions = {}): void {
  const { center = false, level = "log" } = options;

  const colorFunction = colorFunctions[level];
  const coloredMessage = colorFunction(message);

  if (center) {
    const consoleWidth = getConsoleWidth();
    const padding = Math.max(
      0,
      Math.floor((consoleWidth - message.length) / 2),
    );
    console.log(" ".repeat(padding) + coloredMessage);
  } else {
    console.log(coloredMessage);
  }
}

export const Querylog = (message: string, center = false) =>
  logger(message, { center, level: "log" });
export const QueryInfo = (message: string, center = false) =>
  logger(message, { center, level: "info" });
export const QuerySuccess = (message: string, center = false) =>
  logger(message, { center, level: "success" });
export const QueryWarn = (message: string, center = false) =>
  logger(message, { center, level: "warn" });
export const QueryError = (message: string, center = false) =>
  logger(message, { center, level: "error" });
