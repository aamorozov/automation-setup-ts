import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as mkdirp from 'mkdirp';
import { promisify } from 'util';

export const promisifiedMkdirp = promisify(mkdirp);
export const isDirExists = (dir: string): boolean => fs.existsSync(dir);
export const promisifiedCopy = promisify(fs.copy);

export const warning = (value: string): void =>
  console.log(chalk.yellow(value));
export const success = (value: string): void => console.log(chalk.green(value));
export const error = (value: string): void => console.log(chalk.red(value));
export const regection = (value: string): Error => new Error(chalk.red(value));

export const getStaticDirectories = (directory: string): Promise<string[]> => {
  return fs.readdir(directory);
};

export const removeWordFromString = (
  str: string,
  word: string
): string | undefined => str.split(word).pop();

export const generateResolvers = (
  object: object
): Iterable<PromiseLike<any>> => {
  return Object.values(object).map(async value => {
    if (isDirExists(value)) {
      try {
        Promise.resolve(warning(`Directory already exists at ${value}`));
      } catch (e) {
        Promise.reject(regection(e));
      }
    } else {
      try {
        await promisifiedMkdirp(value);
        Promise.resolve(success(`Created directories in ${value}`));
      } catch (e) {
        Promise.reject(regection(e));
      }
    }
  });
};
