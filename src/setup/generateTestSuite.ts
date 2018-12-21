import {
  isDirExists,
  promisifiedCopy,
  regection,
  removeWordFromString,
  success,
  warning
} from './utils';

import * as path from 'path';

const staticDirectories = {
  tests: path.join('__tests__', 'e2e', 'tests'),
  pageObjects: path.join('__tests__', 'e2e', 'pages'),
  commands: path.join('__tests__', 'e2e', 'commands'),
  assertions: path.join('__tests__', 'e2e', 'assertions'),
  data: path.join('__tests__', 'e2e', 'data'),
  config: path.join('__tests__', 'e2e', 'config'),
  utils: path.join('__tests__', 'e2e', 'utils')
};

export default async function generateExamples(): Promise<void> {
  const getExistingDirectories = (object: object): string[] | null => {
    const existingObjects = Object.values(object).filter(
      (directory: string): string | null => {
        if (isDirExists(path.join('__tests__', 'e2e', directory))) {
          return null;
        } else {
          return directory;
        }
      }
    );
    if (existingObjects.length > 0) {
      return existingObjects;
    } else {
      return null;
    }
  };

  const generateResolvers = (
    resolveArray: string[]
  ): Iterable<PromiseLike<any>> => {
    return resolveArray.map(async directory => {
      if (isDirExists(directory)) {
        try {
          Promise.resolve(warning(`Directory already exists at ${directory}`));
        } catch (e) {
          Promise.reject(regection(e));
        }
      } else {
        try {
          promisifiedCopy(
            path.join(
              'src',
              'static',
              `${removeWordFromString(directory, './static/')}`
            ),
            directory,
            undefined
          );
          Promise.resolve(
            success(
              `The directory ${removeWordFromString(
                `${directory}`,
                './static/'
              )} was created and copied successfuly!`
            )
          );
        } catch (e) {
          Promise.reject(
            regection(`There is an error when coppying the directory: \n ${e}`)
          );
        }
      }
    });
  };
  const runPromises = async () => {
    try {
      const existingDirectories = getExistingDirectories(staticDirectories);
      if (existingDirectories) {
        await Promise.all(generateResolvers(existingDirectories));
      }
    } catch (e) {
      Promise.reject(regection(e));
    }
  };
  return runPromises();
}
