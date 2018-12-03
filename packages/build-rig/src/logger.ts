import chalk from 'chalk';

let longestTaskNameLength: number = 0;

function getTimestamp() {
  const now = new Date();
  return `[${now.toLocaleTimeString()}]`;
}

export interface ILogger {
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
}

export const logger: ILogger = {
  info(msg?: any, ...optionalParams: any[]) {
    console.info.apply(null, [`${chalk.gray(getTimestamp())} ${chalk.green('\u25a0')} ${msg}`, ...optionalParams]);
  },

  warn(msg?: any, ...optionalParams: any[]) {
    console.warn.apply(null, [`${chalk.gray(getTimestamp())} ${chalk.yellow('\u25b2')} ${msg}`, ...optionalParams]);
  },

  error(msg?: any, ...optionalParams: any[]) {
    console.error.apply(null, [`${chalk.gray(getTimestamp())} ${chalk.redBright('x')} ${msg}`, ...optionalParams]);
  }
};

function prettyTaskName(taskName: string) {
  const diff = (longestTaskNameLength - taskName.length) / 2;
  const leftHalf = Math.floor(diff);
  const rightHalf = Math.ceil(diff);

  return ' '.repeat(leftHalf) + taskName + ' '.repeat(rightHalf);
}

export const taskLogger = (taskName: string): ILogger => {
  if (taskName.length > longestTaskNameLength) {
    longestTaskNameLength = taskName.length;
  }

  return {
    info(msg?: any, ...optionalParams: any[]) {
      logger.info.apply(null, [`[${chalk.green(prettyTaskName(taskName))}] ${msg}`, ...optionalParams]);
    },

    warn(msg?: any, ...optionalParams: any[]) {
      logger.warn.apply(null, [`[${chalk.yellow(prettyTaskName(taskName))}] ${msg}`, ...optionalParams]);
    },

    error(msg?: any, ...optionalParams: any[]) {
      logger.error.apply(null, [`[${chalk.red(prettyTaskName(taskName))}] ${msg}`, ...optionalParams]);
    }
  };
};
