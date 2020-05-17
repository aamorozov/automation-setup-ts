import path from 'path';
import chalk from 'chalk';

import {
  readDirAsync,
  isDirExists,
  resolvePaths,
  copyAsync,
  rejection,
  removeWordFromString,
  success,
  warning,
} from './utils';

const STATIC_FOLDER_PATH = resolvePaths(['src', 'static']);

const getExistingDirs = (dirs: string[]): string[] | null => {
  const existingDirs = dirs.filter((dir: string): string | null => {
    if (isDirExists(resolvePaths([dir]))) {
      return null;
    } else {
      return dir;
    }
  });
  return existingDirs.length > 0 ? existingDirs : null;
};

const resolveDirs = async (dirs: string[]): Promise<void> => {
  await Promise.all(
    dirs.map(async (dir) => {
      const existingDir = path.join('../../__tests__', 'e2e', dir);
      const exists = isDirExists(existingDir);
      if (exists) {
        return warning(`Directory already exists at ${chalk.bold(dir)}`);
      } else {
        try {
          const from = resolvePaths(['src', 'static', dir]);
          const to = existingDir;
          await copyAsync(from, to);
          return success(
            `The directory ${chalk.bold(
              removeWordFromString(`${dir}`, './static/'),
            )} was created and copied successfuly!`,
          );
        } catch (e) {
          throw rejection(`Error copying directory ${chalk.bold(dir)}`);
        }
      }
    }),
  );
};

export default async function generateTestSuite(): Promise<void> {
  try {
    /**
     * this returns all dirs that exist in target dir
     */
    const staticDirs = await readDirAsync(STATIC_FOLDER_PATH);
    const existingDirs = getExistingDirs(staticDirs);
    if (existingDirs) {
      await resolveDirs(existingDirs);
    }
  } catch (e) {
    throw rejection(e);
  }
}
