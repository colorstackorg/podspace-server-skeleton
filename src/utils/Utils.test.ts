import cases from 'jest-in-case';

import { TestObject } from './types';
import Utils from './Utils';

cases(
  'Utils.isDefined()',
  ({ input, output }: TestObject<unknown, boolean>) => {
    const actualResult: boolean = Utils.isDefined(input);
    expect(actualResult).toEqual(output);
  },
  {
    'If input is empty string, should return true.': {
      input: null,
      output: true
    },

    'If input is false, should return true.': {
      input: false,
      output: true
    },

    'If input is null, should return true.': {
      input: null,
      output: true
    },

    'If input is undefined, should return false.': {
      input: undefined,
      output: false
    }
  }
);

cases(
  'Utils.cleanObject()',
  ({
    input,
    output
  }: TestObject<Record<string, unknown>, Record<string, unknown>>) => {
    const actualResult: Record<string, unknown> = Utils.cleanObject(input);
    expect(actualResult).toEqual(output);
  },
  {
    'If input has no undefined keys, should return exact same object.': {
      input: { a: 1, b: 2 },
      output: { a: 1, b: 2 }
    },

    'If input is an empty object, should return an empty object.': {
      input: {},
      output: {}
    },

    'If input is null, should return an empty object.': {
      input: null,
      output: {}
    },

    'If input is undefined, should return an empty object.': {
      input: undefined,
      output: {}
    },

    'Should not remove any null keys from the object.': {
      input: { a: null, b: null },
      output: { a: null, b: null }
    },

    'Should remove all undefined keys from the object.': {
      input: { a: null, b: undefined },
      output: { a: null }
    }
  }
);
