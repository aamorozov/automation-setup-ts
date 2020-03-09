import * as path from 'path';
import {
  isDirExists,
  promisifiedMkdirp,
  regection,
  success,
  warning,
} from './utils';

const tempDirectoryFiles: object = {
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

const generateResolvers = (object: object): Iterable<PromiseLike<any>> => {
  return Object.values(object).map(async value => {
    if (isDirExists(value)) {
      try {
        Promise.resolve(warning(`Directory already exists at ${value}`));
      } catch (e) {
        Promise.reject(regection(e));
      }
    } else {
      try {
        await promisifiedMkdirp(value, undefined);
        Promise.resolve(success(`Created directories in ${value}`));
      } catch (e) {
        Promise.reject(regection(e));
      }
    }
  });
};

export default async function createTempFileDirectory(): Promise<void> {
  const runPromises = async () => {
    await Promise.all(generateResolvers(tempDirectoryFiles));
  };
  return runPromises();
}
