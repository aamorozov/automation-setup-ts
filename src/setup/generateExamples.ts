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
  pageObjects: path.join('__tests__', 'e2e', 'pageObjects'),
  commands: path.join('__tests__', 'e2e', 'commands'),
  assertions: path.join('__tests__', 'e2e', 'assertions'),
  data: path.join('__tests__', 'e2e', 'globalData'),
  config: path.join('__tests__', 'e2e', 'config'),
  utils: path.join('__tests__', 'e2e', 'utils')
};

export default async function generateExamples(): Promise<void> {
  const getExistingDirectories = (object: object) =>
    Object.values(object).filter(
      (directory: string): boolean =>
        isDirExists(
          path.join(
            '__tests__',
            'e2e',
            `${removeWordFromString(directory, './static/')}`
          )
        )
    );

  const generateResolvers = (object: object): Iterable<PromiseLike<any>> => {
    return Object.values(object).map(async directory => {
      if (isDirExists(directory)) {
        try {
          Promise.resolve(warning(`Directory already exists at ${directory}`));
        } catch (e) {
          Promise.reject(regection(e));
        }
      } else {
        try {
          await promisifiedCopy(
            directory,
            path.join(
              '__tests__',
              'e2e',
              `${removeWordFromString(directory, './static/')}`
            ),
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
      const existingDirectories = getExistingDirectories(staticDirectories);
      if (existingDirectories.length === 0) {
        Promise.reject(regection('No static directories exist'));
      }
      await Promise.all(generateResolvers(existingDirectories));
    } catch (e) {
      Promise.reject(regection(e));
    }
  };
  return runPromises();
}
