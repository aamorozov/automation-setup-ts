import { generateConfig } from './config/generateConfig';
import webpackConfig from './config/webpack.config';

const config = generateConfig(webpackConfig);

module.exports = config;
