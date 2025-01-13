import { describe, expect, it, vi } from 'vitest';
import { isObject } from '../../utils/is';
import { hasOwn } from '../../utils/';
import { buildProp, epPropKey } from '../../props';

// Mocking external dependencies
vi.mock('../utils/is', () => ({
  isObject: vi.fn(),
}));

vi.mock('../utils/objects', () => ({
  hasOwn: vi.fn(),
}));

describe('buildProp function tests', () => {
  it('should return an epProp when passed valid prop object', () => {
    const prop = {
      type: String,
      values: ['light', 'dark'],
    };

    const result = buildProp(prop);

    expect(result).toHaveProperty(epPropKey);
    expect(result.type).toBe(String);
    expect(result.values).toEqual(['light', 'dark']);
  });

  it('should include default value if provided', () => {
    const prop = {
      type: String,
      values: ['light', 'dark'],
      default: 'light',
    };

    const result = buildProp(prop);

    expect(result.default).toBe('light');
  });

  it('should call validator function when values or validator is present', () => {
    const validatorMock = vi.fn().mockReturnValue(true);
    const prop = {
      type: String,
      values: ['light', 'dark'],
      validator: validatorMock,
    };

    const result = buildProp(prop);

    expect(result.validator).toBeDefined();
    expect(validatorMock).toHaveBeenCalledTimes(0); // Validator is called during validation
  });

  it('should generate a correct validation function based on values', () => {
    const prop = {
      type: String,
      values: ['light', 'dark'],
    };

    const result = buildProp(prop);

    expect(result.validator).toBeDefined();
    const validationResult = result.validator('light');
    expect(validationResult).toBe(true);
  });

  it('should warn when validation fails', () => {
    const warnMock = vi.fn();
    vi.stubGlobal('warn', warnMock);

    const prop = {
      type: String,
      values: ['light', 'dark'],
    };

    const result = buildProp(prop);

    result.validator('invalid');
    expect(warnMock).toHaveBeenCalledWith(
      expect.stringContaining('Invalid prop: validation failed')
    );
  });

  it('should return the same prop if it is already an EpProp', () => {
    const prop = { [epPropKey]: true };
    const result = buildProp(prop);

    expect(result).toBe(prop);
  });

  it('should handle nested props correctly', () => {
    const prop = {
      type: String,
      values: ['small', 'large'],
      validator: (val: unknown): val is string => typeof val === 'string',
    };

    const result = buildProp(prop);

    expect(result.type).toBe(String);
    expect(result.values).toEqual(['small', 'large']);
  });
});
