import chalk from 'chalk';
import fs from 'fs-extra';
import mkdirp from 'mkdirp';
import path from 'path';
import {promisify} from 'util';

export const createDirAsync = promisify(mkdirp);
export const copyAsync = promisify(fs.copy);
export const isDirExists = (dir: string): boolean => fs.existsSync(dir);

// prettier-ignore
export const warning = (value: string): void => console.log(chalk.yellow(value));
export const success = (value: string): void => console.log(chalk.green(value));
export const error = (value: string): void => console.log(chalk.red(value));
export const rejection = (value: string): Error => new Error(chalk.red(value));

// prettier-ignore
export const readDirAsync = async (dir: string): Promise<string[]> => await fs.readdir(dir);
// prettier-ignore
export const resolvePaths = (values: string[]): string => path.resolve(path.join(...values));

// prettier-ignore
export const removeWordFromString = (str: string, word: string): string | undefined => str.split(word).pop();
