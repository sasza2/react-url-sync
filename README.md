# react-url-sync
React library for handling data in query param with specified types.

!["Preview"](docs/preview.gif?raw=true "Example preview")

# Installation

```sh
npm install react-url-sync
```

# Requirements
* react
* react-router

# API

## &lt;`UrlSync` {...types} /&gt;
Provider - taking <a href="https://www.npmjs.com/package/type-casting">types</a> as props. Each prop name is query string param

```jsx
<UrlSyncProvider
  answers={Type.Array(Type.Int).options({required: true })}
  other={Type.String({ default: 'ddd' })}
>
  <div className='form'>
    <Link to='/?other=eee&answers=1' title='/?other=eee&answers=1'>reset</Link>
    <Checkbox id={1} label='aaa' />
    <Checkbox id={2} label='bbb' />
    <Checkbox id={3} label='ccc' />
    <Input />
  </div>
</UrlSyncProvider>
```

## useUrlSync()` 
Hook to operate on query params with functions below:

### `change(key:string, value:any)`

Change query param with value

```js
const Input = () => {
  const { change, values } = useUrlSync()
  const onChange = (e) => change('other', e.target.value)
  return (
    <input type='text' value={values.other} onChange={onChange} />
  )
}
```

### `changeAll(values:object)`

Changing all query params

```jsx
changeAll({ answers: [2], other: 'eee' })
```

### `toggle(key:string, value:any)`  
Toggling values in array (working only with it) type

```jsx
const Checkbox = ({ id, label }) => {
  const { toggle, values } = useUrlSync()
  const onChange = () => toggle('answers', id)
  return (
    <label>
      <input checked={values.answers.includes(id)} onChange={onChange} type='checkbox' />
      {label}
    </label>
  )
}
```

### `values():object`

Query params values

```jsx
const { values } = useUrlSync()
// { answers: [ 1, 3 ], other: 'xyz' }
console.log(values)
```

# Example

```jsx
import React from 'react'
import { Link } from 'react-router-dom'
import UrlSync, { Type, useUrlSync } from 'react-url-sync'

import './App.css'

const Checkbox = ({ id, label }) => {
  const { toggle, values } = useUrlSync()
  const onChange = () => toggle('answers', id)
  return (
    <label>
      <input checked={values.answers.includes(id)} onChange={onChange} type='checkbox' />
      {label}
    </label>
  )
}

const Input = () => {
  const { change, values } = useUrlSync()
  const onChange = (e) => change('other', e.target.value)
  return (
    <input type='text' value={values.other} onChange={onChange} />
  )
}

const App = () => (
  <UrlSync
    answers={Type.Array(Type.Int).options({required: true })}
    other={Type.String({ default: 'ddd' })}
  >
    <div className='form'>
      <Link to='/?other=eee&answers=1' title='/?other=eee&answers=1'>reset</Link>
      <Checkbox id={1} label='aaa' />
      <Checkbox id={2} label='bbb' />
      <Checkbox id={3} label='ccc' />
      <Input />
    </div>
  </UrlSync>
)

export default App
```

# Building
```
npm run build
```
