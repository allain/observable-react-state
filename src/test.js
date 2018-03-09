import ObservableState from '.'

// Environment is sane
it('expects a sane environment', () =>
  expect(typeof Symbol.observable).toEqual('symbol'))

it('instances are observable', () => {
  const s = new ObservableState()
  expect(typeof s.subscribe).toEqual('function')
  expect(s[Symbol.observable]()).toBe(s)
})

it('supports setState with object param', () => {
  const s = new ObservableState()
  s.setState({ a: 10 })
  expect(s.state.a).toEqual(10)
})

it('supports setState with function param', () => {
  const s = new ObservableState()
  s.setState(state => ({ ...state, a: 10 }))
  expect(s.state.a).toEqual(10)
})

it('does not emit anything unless a setState is called', cb => {
  const s = new ObservableState()
  s.subscribe(() => {
    throw new Error('This should not get called yet')
  })
  cb(null)
})

it('does not emit anything f subscription happens after setState', cb => {
  const s = new ObservableState()
  s.setState({ a: 10 })
  s.subscribe(() => {
    throw new Error('This should not get called yet')
  })
  cb(null)
})

it('calls subscribers when setState is called', cb => {
  const s = new ObservableState()
  s.subscribe(() => cb(null))
  s.setState({ a: 10 })
})

it('passes state object to subscribers when it changes', cb => {
  const s = new ObservableState()
  s.subscribe(param => {
    expect(param).toBe(s)
    cb(null)
  })
  s.setState({ a: 10 })
})
