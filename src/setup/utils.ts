import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import { promisify } from 'util';

export const promisifiedMkdirp = promisify(mkdirp);
export const isDirExists = (dir: string): boolean => fs.existsSync(dir);
export const promisifiedCopy = promisify(fs.copy);

export const warning = (value: string): void =>
  console.log(chalk.yellow(value));
export const success = (value: string): void => console.log(chalk.green(value));
export const error = (value: string): void => console.log(chalk.red(value));
export const regection = (value: string): Error => new Error(chalk.red(value));

export const getStaticDirectories = (directory: string): Promise<string[]> =>
  fs.readdir(directory);

export const pathResolver = (values: string[]): string =>
  path.resolve(path.join(...values));

export const removeWordFromString = (
  str: string,
  word: string
): string | undefined => str.split(word).pop();
