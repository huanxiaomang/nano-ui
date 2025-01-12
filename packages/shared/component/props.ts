import { Component } from 'vue';
import { definePropType } from '../vue/props';

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function,
]);
