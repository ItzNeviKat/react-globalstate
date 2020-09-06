import { ReactNode } from 'react';

export type TCallback = () => void;
export type TSetState<T> = (newState: T) => T;
export type TCustomSetState<T> = (state: T, newState: T) => T;

export type TUseGlobalState<T> = [T, TSetState<T>];
export type TWithGlobalState = ReactNode;

export interface IOptions<T> {
  state?: T;
  customSetState?: TCustomSetState<T>;
  callbacks?: TCallback[];
}

export { GlobalState } from './GlobalState';
