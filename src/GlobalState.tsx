import * as React from 'react';
import { IOptions, TCallback, TSetState, TUseGlobalState, TWithGlobalState } from './types';

export class GlobalState<T> {
  private options: IOptions<T> = {};

  constructor(initialState?: Partial<T>, customSetState?: TSetState<T>) {
    this.options.state = initialState as T;
    this.options.customSetState = customSetState;
    this.options.callbacks = [];

    this.setState = this.setState.bind(this);
    this.useGlobalState = this.useGlobalState.bind(this);
    this.withGlobalState = this.withGlobalState.bind(this);
  }

  public subscribe(callback: TCallback): TCallback {
    this.options.callbacks.push(callback);

    return () => (this.options.callbacks = this.options.callbacks.filter(cb => cb !== callback));
  }

  public setState(newState: Partial<T>): T {
    if (this.options.customSetState) this.options.state = this.options.customSetState(this.options.state, newState);
    else this.options.state = { ...this.state, ...newState };

    this.options.callbacks.forEach(callback => callback());
    return this.options.state;
  }

  public useGlobalState(): TUseGlobalState<T> {
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);

    const unSubscribe = this.subscribe(() => forceUpdate());

    React.useEffect(() => unSubscribe, []);

    return [this.state, this.setState, unSubscribe];
  }

  public withGlobalState(Component: React.ElementType): TWithGlobalState {
    return (props: any) => {
      const [globalState, setGlobalState, unSubscribe] = this.useGlobalState();

      return (<Component globalState={globalState} setGlobalState={setGlobalState} unSubscribe={unSubscribe} {...props} />);
    }
  }

  public get state(): T {
    return this.options.state;
  }
}
