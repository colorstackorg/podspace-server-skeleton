import { Config as JestConfig } from '@jest/types';

const coverageOptions: Partial<JestConfig.InitialOptions> = {
  collectCoverageFrom: ['**/src/**/*.ts'],
  coveragePathIgnorePatterns: ['.test.ts', '.types.ts', 'constants.ts']
};

const mockOptions: Partial<JestConfig.InitialOptions> = {
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};

const jestConfig: JestConfig.InitialOptions = {
  ...coverageOptions,
  ...mockOptions,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node'
};

export default jestConfig;
