import path from 'path';
import chalk from 'chalk';
import {
  isDirExists,
  createDirAsync,
  success,
  rejection,
  warning,
} from './utils';

interface TempFileDirs {
  videos: string;
  reports: string;
  screenshots: string;
  serverLogs: string;
}

/**
 * this includes the directories specified in nightwatch.config.js as
 * target directories for generating videos, report, screenoshot
 * and serveg logs generation.
 */
const dirs: TempFileDirs = {
  videos: path.join('../../__tests__', 'e2e', 'generatedFiles', 'videos'),
  reports: path.join('../../__tests__', 'e2e', 'generatedFiles', 'reports'),
  screenshots: path.join(
    '../../__tests__',
    'e2e',
    'generatedFiles',
    'screenshots',
  ),
  serverLogs: path.join(
    '../../__tests__',
    'e2e',
    'generatedFiles',
    'serverLogs',
  ),
};

function createDirs(dirs: TempFileDirs): Iterable<PromiseLike<any>> {
  return Object.entries(dirs).map(async ([dirName, dirPath]) => {
    const exists = isDirExists(dirPath);
    if (exists) {
      warning(
        `Directory ${chalk.bold(dirName)} already exists at: ${chalk.bold(
          dirPath,
        )}`,
      );
    } else {
      try {
        /**
         * second argument is needed to satisfy
         * second argument req in mkdirp
         */
        await createDirAsync(dirPath, undefined);
        return success(
          `Created directory ${chalk.bold(dirName)} at: ${chalk.bold(dirPath)}`,
        );
      } catch (e) {
        throw rejection(
          `Failed to create a directory ${chalk.bold(dirName)} at: ${chalk.bold(
            dirPath,
          )}`,
        );
      }
    }
  });
}

export default async function createTempFileDirectory(): Promise<void> {
  await Promise.all(createDirs(dirs));
}
