import {
  getStaticDirectories,
  isDirExists,
  promisifiedCopy,
  regection,
  removeWordFromString,
  success,
  warning
} from './utils';

import * as path from 'path';

const STATIC_FOLDER_PATH = path.resolve(path.join('src', 'static'));
const getTestSuitePath = (directory: string) =>
  path.resolve(path.join('__tests__', 'e2e', directory));

export default async function generateExamples(): Promise<void> {
  const getExistingDirectories = (object: object): string[] | null => {
    const existingObjects = Object.values(object).filter(
      (directory: string): string | null => {
        if (isDirExists(getTestSuitePath(directory))) {
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

  const generateResolvers = async (
    staticDirectories: string[]
  ): Promise<void> => {
    await Promise.all(
      staticDirectories.map(async directory => {
        if (isDirExists(directory)) {
          try {
            Promise.resolve(
              warning(`Directory already exists at ${directory}`)
            );
          } catch (e) {
            Promise.reject(regection(e));
          }
        } else {
          try {
            const from = path.resolve(path.join('src', 'static', directory));
            const to = path.resolve(path.join('__tests__', 'e2e', directory));
            try {
              await promisifiedCopy(from, to);
            } catch (e) {
              Promise.reject(e);
            }
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
              regection(
                `There is an error when coppying the directory: \n ${e}`
              )
            );
          }
        }
      })
    );
  };

  const runPromises = async () => {
    try {
      const staticDirectories = await getStaticDirectories(STATIC_FOLDER_PATH);
      const existingDirectories = getExistingDirectories(staticDirectories);
      if (existingDirectories) {
        await generateResolvers(existingDirectories);
      }
    } catch (e) {
      Promise.reject(regection(e));
    }
  };

  await runPromises();
}
