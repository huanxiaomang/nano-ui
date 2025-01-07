import { PropType, warn } from 'vue';
import { fromPairs, isObject } from 'lodash-unified';

export const epPropKey = Symbol('__epPropKey');

export type EpProp<
  Type,
  Default = unknown,
  Required extends boolean = false
> = {
  readonly type: PropType<Type>;
  readonly required: Required;
  readonly validator?: (val: unknown) => boolean;
  [epPropKey]: true;
} & (Default extends never ? object : { readonly default: Default });

export type EpPropInput<Type, Default, Required> = {
  type?: Type;
  required?: Required;
  values?: readonly any[];
  validator?: (val: any) => boolean;
  default?: Default;
};

export type NativePropType =
  | ((...args: any) => any)
  | { new (...args: any): any }
  | undefined
  | null;

// 判断是否为 EpProp 类型
export const isEpProp = (val: unknown): val is EpProp<any, any, any> => {
  return isObject(val) && (val as any)[epPropKey] === true;
};

// 构建单个 prop 类型
export const buildProp = <
  Type = never,
  Default = never,
  Required extends boolean = false
>(
  prop: EpPropInput<Type, Default, Required>,
  key?: string
): EpProp<Type, Default, Required> => {
  if (isEpProp(prop)) return prop as any; // 如果已是 EpProp 类型，直接返回

  const { values, required, default: defaultValue, type, validator } = prop;

  // 创建 validator 函数
  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false;
          let allowedValues: unknown[] = [];

          // 处理 values 和 defaultValue
          if (values) {
            allowedValues = Array.from(values);
            if (defaultValue) allowedValues.push(defaultValue);
            valid ||= allowedValues.includes(val);
          }

          // 使用自定义 validator
          if (validator) valid ||= validator(val);

          // 校验失败时的警告
          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)]
              .map((v) => JSON.stringify(v))
              .join(',');
            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
                val
              )}`
            );
          }
          return valid;
        }
      : undefined;

  // 构建 EpProp
  const epProp = {
    type,
    required: required ?? false, // 默认值为 false
    validator: _validator,
    [epPropKey]: true,
  } as any;

  // 添加 default 字段
  if (defaultValue !== undefined) epProp.default = defaultValue;

  return epProp;
};

// 批量构建 props
export const buildProps = <
  Props extends Record<
    string,
    { [epPropKey]: true } | NativePropType | EpPropInput<any, any, any>
  >
>(
  props: Props
): {
  [K in keyof Props]: EpProp<any, any, any>;
} => {
  return fromPairs(
    Object.entries(props).map(([key, option]) => [
      key,
      buildProp(option as any, key), // 构建单个 prop
    ])
  ) as any;
};
