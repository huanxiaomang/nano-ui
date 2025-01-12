import type { epPropKey } from './runtime';
import type { ExtractPropTypes, PropType } from 'vue';
import type { IfNever, UnknownToNever, WritableArray } from './util';

type Value<T> = T[keyof T];

/**
 * Extracts the type of a single prop.
 *
 * @example
 * ExtractPropType<{ type: StringConstructor }> => string | undefined
 * ExtractPropType<{ type: StringConstructor, required: true }> => string
 * ExtractPropType<{ type: BooleanConstructor }> => boolean
 */
export type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{ key: T }>
>;

/**
 * Resolves the type using `ExtractPropTypes`, handling `PropType<T>`, `Constructor`, and `never`.
 *
 * @example
 * ResolvePropType<BooleanConstructor> => boolean
 * ResolvePropType<PropType<T>> => T
 */
export type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{ type: WritableArray<T>; required: true }>
>;

/**
 * Merges types: Type, Value, and Validator.
 *
 * @example
 * EpPropMergeType<StringConstructor, '1', 1> => 1 | "1"
 * EpPropMergeType<StringConstructor, never, number> => string | number
 */
export type EpPropMergeType<Type, Value, Validator> =
  | IfNever<UnknownToNever<Value>, ResolvePropType<Type>, never>
  | UnknownToNever<Value>
  | UnknownToNever<Validator>;

/**
 * Handles default values for input props based on constraints.
 */
export type EpPropInputDefault<
  Required extends boolean,
  Default
> = Required extends true
  ? never
  : Default extends Record<string, unknown> | Array<any>
  ? () => Default
  : (() => Default) | Default;

/**
 * Defines native prop types, like `BooleanConstructor`, `StringConstructor`, etc.
 */
export type NativePropType =
  | ((...args: any) => any)
  | { new (...args: any): any }
  | undefined
  | null;
export type IfNativePropType<T, Y, N> = [T] extends [NativePropType] ? Y : N;

/**
 * Defines input prop constraints and possible values.
 *
 * @example
 * EpPropInput<StringConstructor, 'a', never, never, true> => {
 *   type?: StringConstructor;
 *   required?: true;
 *   values?: readonly "a"[];
 *   validator?: ((val: any) => boolean);
 *   default?: undefined;
 * }
 */
export type EpPropInput<
  Type,
  Value,
  Validator,
  Default extends EpPropMergeType<Type, Value, Validator>,
  Required extends boolean
> = {
  type?: Type;
  required?: Required;
  values?: readonly Value[];
  validator?: ((val: any) => val is Validator) | ((val: any) => boolean);
  default?: EpPropInputDefault<Required, Default>;
};

/**
 * Defines output prop type structure.
 *
 * @example
 * EpProp<'a', 'b', true> => {
 *   readonly type: PropType<"a">;
 *   readonly required: true;
 *   readonly validator: ((val: unknown) => boolean);
 *   readonly default: "b";
 *   __epPropKey: true;
 * }
 */
export type EpProp<Type, Default, Required> = {
  readonly type: PropType<Type>;
  readonly required: [Required] extends [true] ? true : false;
  readonly validator: ((val: unknown) => boolean) | undefined;
  [epPropKey]: true;
} & IfNever<Default, unknown, { readonly default: Default }>;

/**
 * Determines if the type is an `EpProp`.
 */
export type IfEpProp<T, Y, N> = T extends { [epPropKey]: true } ? Y : N;

/**
 * Converts input prop to its final output form.
 */
export type EpPropConvert<Input> = Input extends EpPropInput<
  infer Type,
  infer Value,
  infer Validator,
  any,
  infer Required
>
  ? EpPropFinalized<Type, Value, Validator, Input['default'], Required>
  : never;

/**
 * Final output conversion for `EpProp`.
 */
export type EpPropFinalized<Type, Value, Validator, Default, Required> = EpProp<
  EpPropMergeType<Type, Value, Validator>,
  UnknownToNever<Default>,
  Required
>;

export {};
