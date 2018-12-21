import createTempFileDirectory from './src/setup/createTempFileDirectory';
import generateTestSuite from './src/setup/generateTestSuite';

Promise.all([createTempFileDirectory(), generateTestSuite()]);
