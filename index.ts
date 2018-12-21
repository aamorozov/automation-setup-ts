import createTempFileDirectory from './src/setup/createTempFileDirectory';
import generateExamples from './src/setup/generateExamples';

Promise.all([createTempFileDirectory(), generateExamples()]);
