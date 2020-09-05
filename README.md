# react-globalstate
 This module allows you to use one state for all components of app in React

 Этот модуль позволяет вам использовать одно состояние для всех компонентов приложения в React
 
## Установка
Вы можете установить модуль с помощью `npm`:
```shell script
npm install react-globalstate
```
или с помощью `yarn`:
```shell script
yarn add react-globalstate
```

## Использование
В файле store импортируем класс GlobalState из модуля:
```javascript
import { GlobalState } from 'react-globalstate';
```
Затем создаём новый объект класса GlobalState, который записываем в константу globalStateObject и экспортируем:
```javascript
export const globalStateObject = new GlobalState(
  ...начальное состояние (не обязательно),
  ...функция пользовательского обновления состояния (не обязательно)
);
```
И создаём дополнительные экспорты:
```javascript
export const useGlobalState = globalStateObject.useGlobalState;
export const withGlobalState = globalStateObject.withGlobalState;
```

Пример файла `store`:
```javascript
export const globalStateObject = new GlobalState({
  foo: "initial"
});

export const useGlobalState = globalStateObject.useGlobalState;
export const withGlobalState = globalStateObject.withGlobalState;
```

Использование глобального состояния в React Hooks:
```jsx
import { useGlobalState } from './store';

const App = () => {
  const [globalState, setGlobalState] = useGlobalState();

  const changeState = () => setGlobalState({ foo: "bar" });
  
  return (
    <div>
      <h1>Foo is now: {globalState.foo}</h1>
      <button onClick={changeState}>Click here to change 'foo' state</button>
    </div>
  );
}

export default App;
```

Использование глобального состояния в React Classes:
```jsx
import { withGlobalState } from './store';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  changeState() {
    this.props.setGlobalState({ foo: "bar" });
  }

  render() {
    return (
      <div>
        <h1>Foo is now: {this.props.globalState.foo}</h1>
        <button onClick={this.changeState}>Click here to change 'foo' state</button>
      </div>
    );
  }
}

export default withGlobalState(App);
```

### Методы
Получение текущего состояния
```javascript
globalState    // => { foo: "bar" }
```

Установка нового состояния
```javascript
setGlobalState({
  ...новое состояние
});
```
При этом обновляются или добавляется только те поля, которые вы укажете в новом состоянии, т. е. старые поля и значения не удаляются. Например:<br/>
*NOTE: Только без использования customSetState*
```javascript
setGlobalState({
  foo: "bar"
});
console.log(globalState);    // => { foo: "bar" }

setGlobalState({
  hello: "world"
});
console.log(globalState);    // => { foo: "bar", hello: "world }

setGlobalState({
  foo: "notbar"
});
console.log(globalState);    // => { foo: "notbar", hello: "world }
```

Использование функции пользовательского обновления состояния (customSetState):
```javascript
new GlobalState(
  ...начальное состояние (не обязательно),
  (state, newState) => {
    // state - текущее состояние
    // newState - новое состояние при setState
    // для установки нового состояния используйте return новоеСостояние;
    ...code
  }
);
```

Пример для функции пользовательского обновления состояния (customSetState) с использованием массива в качестве состояния:
```javascript
new GlobalState(
  [
    "привет",
    "как",
    "дела"
  ],
  (state, newState) => {
    // Теперь setGlobalState(["привет", "нормально"]) не будет заканчиваться ошибкой и нормально отработает
    return [...state, ...newState];
  }
);
```

### Happy coding!
