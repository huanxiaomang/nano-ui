import { warn as vueWarn } from 'vue';
import { assign, fromPairs, isObject } from 'lodash-unified';
import { hasOwn } from '../utils/objects';

import type { PropType } from 'vue';
import type {
  EpProp,
  EpPropConvert,
  EpPropFinalized,
  EpPropInput,
  EpPropMergeType,
  IfEpProp,
  IfNativePropType,
  NativePropType,
} from './types';

export const epPropKey = '__epPropKey';

export const definePropType = <T>(val: any): PropType<T> => val;

export const isEpProp = (val: unknown): val is EpProp<any, any, any> =>
  isObject(val) && !!(val as any)[epPropKey];

const createValidator = (
  values: readonly unknown[] | undefined,
  validator: ((val: unknown) => boolean) | undefined,
  defaultValue: unknown,
  key?: string
) => {
  if (!values && !validator) return undefined;

  return (val: unknown) => {
    let valid = false;
    let allowedValues: unknown[] = [];

    if (values) {
      allowedValues = Array.from(values);
      if (hasOwn({ default: defaultValue }, 'default')) {
        allowedValues.push(defaultValue);
      }
      valid ||= allowedValues.includes(val);
    }
    if (validator) valid ||= validator(val);

    if (!valid && allowedValues.length > 0) {
      const allowValuesText = [...new Set(allowedValues)]
        .map((value) => JSON.stringify(value))
        .join(', ');
      vueWarn(
        `Invalid prop: validation failed${
          key ? ` for prop "${key}"` : ''
        }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
          val
        )}.`
      );
    }
    return valid;
  };
};

/**
 * @description 构建 prop，可以更好地优化类型定义，特别是在类型较为复杂或需要校验的情况下。
 * @description 该函数可以帮助构建具有明确类型限制、默认值和校验规则的 prop，优化组件的类型推导。
 * 它支持根据不同的配置项来限制 prop 的类型，增加校验规则以及处理默认值的赋值。
 *
 * @example
 * // 限制选项值，类型会推导为 PropType<'light' | 'dark'>
 * buildProp({
 *   type: String,
 *   values: ['light', 'dark'],
 * } as const)
 *
 * @example
 * // 限制选项值并支持其他类型，类型会推导为 PropType<'small' | 'large' | number'>
 * buildProp({
 *   type: [String, Number],
 *   values: ['small', 'large'],
 *   validator: (val: unknown): val is number => typeof val === 'number',
 * } as const)
 *
 */
export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Default extends EpPropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false
>(
  prop: EpPropInput<Type, Value, Validator, Default, Required>,
  key?: string
): EpPropFinalized<Type, Value, Validator, Default, Required> => {
  if (!isObject(prop) || isEpProp(prop)) return prop as any;

  const { values, required, default: defaultValue, type, validator } = prop;

  const _validator = createValidator(values, validator, defaultValue, key);

  assign(prop, {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true,
    ...(hasOwn(prop, 'default') && { default: defaultValue }),
  });

  return prop as EpPropFinalized<Type, Value, Validator, Default, Required>;
};

export const buildProps = <
  Props extends Record<
    string,
    | { [epPropKey]: true }
    | NativePropType
    | EpPropInput<any, any, any, any, any>
  >
>(
  props: Props
): {
  [K in keyof Props]: IfEpProp<
    Props[K],
    Props[K],
    IfNativePropType<Props[K], Props[K], EpPropConvert<Props[K]>>
  >;
} =>
  fromPairs(
    Object.entries(props).map(([key, option]) => [
      key,
      buildProp(option as any, key),
    ])
  ) as any;
