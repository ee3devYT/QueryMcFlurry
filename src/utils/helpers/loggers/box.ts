import chalk from "chalk";

type ColorOption = "error" | "warn" | "success" | "default";

interface BoxOptions {
  boxWidth?: number;
  padding?: number;
  color?: ColorOption;
  center?: boolean;
}

const colorFunctions = {
  error: chalk.redBright,
  warn: chalk.yellowBright,
  success: chalk.greenBright,
  default: (text: string) => text, // No color modification
};

export function createBox(text: string, options: BoxOptions = {}): void {
  const { boxWidth = 40, padding = 1, color = "default", center = false } =
    options;

  const horizontalBorder: string = "─".repeat(boxWidth - 2);
  const emptyLine: string = "│" + " ".repeat(boxWidth - 2) + "│";

  const textWidth: number = Math.min(text.length, boxWidth - 4);
  const paddingLeft: number = Math.floor((boxWidth - 2 - textWidth) / 2);
  const paddingRight: number = boxWidth - 2 - textWidth - paddingLeft;

  const colorFunction = colorFunctions[color];
  const centeredText: string = "│" + " ".repeat(paddingLeft) +
    colorFunction(chalk.bold(text.slice(0, textWidth))) +
    " ".repeat(paddingRight) + "│";

  const boxLines: string[] = [
    "┌" + horizontalBorder + "┐",
    ...Array(padding).fill(emptyLine),
    centeredText,
    ...Array(padding).fill(emptyLine),
    "└" + horizontalBorder + "┘",
  ];

  if (center) {
    const consoleWidth = process.stdout.columns;
    const leftPadding = Math.max(0, Math.floor((consoleWidth - boxWidth) / 2));
    boxLines.forEach((line) => console.log(" ".repeat(leftPadding) + line));
  } else {
    boxLines.forEach((line) => console.log(line));
  }
}
