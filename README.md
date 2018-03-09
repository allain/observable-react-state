# observable-react-state

> An observable state implementation based on React's Component State approach.


[![NPM](https://img.shields.io/npm/v/observable-react-state.svg)](https://www.npmjs.com/package/observable-react-state)

## Install

```bash
npm install --save observable-react-state
```

## Usage

```jsx
// @flow

import ObservableReactState from 'observable-react-state'

// Flow type applied to state property
type CounterStateType = {
  count: number
}

class CounterState extends ObservableReactState<CounterStateType> {
  state = {
    count: 0
  }

  increment() {
    // setState with an object
    this.setState({count: this.state.count + 1})
  }

  decrement() {
    // setState with a function
    this.setState(state => ({...state, count: state.count - 1}))
  }
}

const counter = new CounterState()

// Because it's an observable
counter.subscribe(() => console.log('count', counter.state.count)

counter.increment()
counter.decrement()
```

## License

ISC © [allain](https://github.com/allain/observable-react-state)
