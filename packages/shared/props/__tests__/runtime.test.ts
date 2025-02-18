import { describe, expect, it } from 'vitest';
import {
  buildProp,
  buildProps,
  createValidator,
  definePropType,
  epPropKey,
  isEpProp,
} from './../../props/';

describe('definePropType', () => {
  it('should return the same type passed as input', () => {
    const result = definePropType<string>('test');
    expect(result).toBe('test');
  });
});

describe('isEpProp', () => {
  it('should return true for an EpProp object', () => {
    const epProp = { [epPropKey]: true };
    expect(isEpProp(epProp)).toBe(true);
  });

  it('should return false for a non-EpProp object', () => {
    expect(isEpProp({})).toBe(false);
  });
});

describe('createValidator', () => {
  const validator = createValidator(['light', 'dark'], undefined, 'light');
  it('should validate a value correctly based on allowed values', () => {
    expect(validator('light')).toBe(true);
    expect(validator('dark')).toBe(true);
    expect(validator('other')).toBe(false);
  });

  const customValidator = createValidator(
    undefined,
    (val: unknown) => typeof val === 'string',
    'default'
  );

  it('should validate based on a custom validator', () => {
    expect(customValidator('test')).toBe(true);
    expect(customValidator(123)).toBe(false);
  });
});

describe('buildProp', () => {
  it('should handle default value', () => {
    const prop = buildProp({ type: String, default: 'defaultValue' });
    expect(prop.default).toBe('defaultValue');
  });

  it('should handle required flag', () => {
    const prop = buildProp({ type: String, required: true });
    expect(prop.required).toBe(true);
  });

  it('should handle validator function', () => {
    const prop = buildProp({
      type: String,
      validator: (val: unknown) => val === 'valid',
    });
    expect(prop.validator!('valid')).toBe(true);
    expect(prop.validator!('invalid')).toBe(false);
  });

  it('should handle values and default value together', () => {
    const prop = buildProp({
      type: String,
      values: ['light', 'dark'],
      default: 'light',
    });
    expect(prop.default).toBe('light');
    expect(prop.validator!('light')).toBe(true);
    expect(prop.validator!('dark')).toBe(true);
    expect(prop.validator!('other')).toBe(false);
  });
});

describe('buildProps', () => {
  it('should build multiple props correctly', () => {
    const props = buildProps({
      prop1: { type: String, default: 'value1' },
      prop2: { type: Number, required: true },
    });

    expect(props.prop1.default).toBe('value1');
    expect(props.prop2.required).toBe(true);
  });
});
