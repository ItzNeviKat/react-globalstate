import { ReactNode } from 'react';

export type TUnsubscribe = () => void;
export type TCallback = () => void;
export type TSetState<T> = (newState: Partial<T>) => T;
export type TCustomSetState<T> = (state: T, newState: Partial<T>) => T;

export type TUseGlobalState<T> = [T, TSetState<T>, TUnsubscribe];
export type TWithGlobalState = ReactNode;

export interface IOptions<T> {
  state?: T;
  customSetState?: TCustomSetState<T>;
  callbacks?: TCallback[];
}

export { GlobalState } from './GlobalState';
