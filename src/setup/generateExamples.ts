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
    // console.log(object);
    const existingObjects = Object.values(object).filter(
      (directory: string): string | null => {
        console.log(isDirExists(path.join('__tests__', 'e2e', directory)));
        if (!isDirExists(path.join('__tests__', 'e2e', directory))) {
          return directory;
        } else {
          return null;
        }
      }
    );
    console.log(existingObjects);
    if (existingObjects.length > 0) {
      return existingObjects;
      // } else {
      //   console.log('')
      // }
    } else {
      return null;
    }
  };

  const generateResolvers = (
    resolveArray: string[]
  ): Iterable<PromiseLike<any>> => {
    return resolveArray.map(async directory => {
      // console.log(directory);
      if (isDirExists(directory)) {
        try {
          Promise.resolve(warning(`Directory already exists at ${directory}`));
        } catch (e) {
          Promise.reject(regection(e));
        }
      } else {
        try {
          await promisifiedCopy(
            path.join(
              'src',
              'static',
              `${removeWordFromString(directory, './static/')}`
            ),
            directory,
            undefined
          );
          await Promise.resolve(
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
      // console.log(staticDirectories);
      const existingDirectories = getExistingDirectories(staticDirectories);
      // console.log(existingDirectories);
      // if (existingDirectories.length === 0) {
      //   Promise.reject(regection('No static directories exist'));
      // }
      if (existingDirectories) {
        await Promise.all(generateResolvers(existingDirectories));
      }
    } catch (e) {
      Promise.reject(regection(e));
    }
  };
  return runPromises();
}
