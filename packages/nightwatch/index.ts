import chalk from 'chalk';
import createTempFileDirectory from './src/setup/createTempFileDirectory';
import generateTestSuite from './src/setup/generateTestSuite';

const packageIsWithinProject = () =>
  __dirname.includes('node_modules') ? true : false;

if (packageIsWithinProject()) {
  console.log(chalk.green('Package is used as a dependency. Scaffolding...'));
  Promise.all([createTempFileDirectory(), generateTestSuite()]);
} else {
  console.log(chalk.yellow('Package is used locally. Skipping...'));
}
