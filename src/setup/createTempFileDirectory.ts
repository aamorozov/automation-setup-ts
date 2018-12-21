import * as path from 'path';
import { generateResolvers } from './utils';

const tempDirectoryFiles: object = {
  videos: path.join('__tests__', 'e2e', 'generatedFiles', 'videos'),
  reports: path.join('__tests__', 'e2e', 'generatedFiles', 'reports'),
  screenshots: path.join('__tests__', 'e2e', 'generatedFiles', 'screenshots'),
  serverLogs: path.join('__tests__', 'e2e', 'generatedFiles', 'serverLogs')
};

export default async function createTempFileDirectory(): Promise<void> {
  const runPromises = async () => {
    await Promise.all(generateResolvers(tempDirectoryFiles));
  };
  return runPromises();
}
