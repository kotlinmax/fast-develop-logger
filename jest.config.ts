import type {Config} from 'jest';
import {pathsToModuleNameMapper} from 'ts-jest';
import {compilerOptions} from './tsconfig.json';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  // TypeScript settings
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {prefix: '<rootDir>/'}),
};

export default config;
