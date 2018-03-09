// @flow
import PushStream from 'zen-push'

export default class ObservableState<State> {
  state: State

  constructor() {
    this._stream = new PushStream()
    this[Symbol.observable] = () => this
  }

  subscribe() {
    let o = this._stream.observable
    return o.subscribe.apply(o, arguments)
  }

  setState(newState) {
    this.state =
      typeof newState === 'function'
        ? newState(this.state)
        : { ...this.state, ...newState }
    this._stream.next(this)
  }
}
