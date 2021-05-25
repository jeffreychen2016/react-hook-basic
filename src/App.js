
import React, {useState} from 'react';

// -------------------
// tutorial link:
// https://www.youtube.com/watch?v=O6P86uwfdR0
// -------------------

function initialState () {
  console.log('call initialState fn...')
  return 5
}

function App() {
  // 1. if pass in function directly or other values as first parameter
  // the funciton or other value will be called every time when the App component is re-rendered
  // in the case where you do not want to call the function multiple times
  // you can use the overload method of `useState`, which takes in a anonymous function
  // -> with this, `initialState` will be called multiple times
  // const [state, setState] = useState(initialState())
  // -> with this, `inistalState` will be called only ONCE
  // 2. the hooks should always be executed in the same order
  // meaning that, you can not conditionally call the hook functions (can not call `useState` inside of IF statement)
  const [state, setState] = useState(() => initialState())

  // we can manage the state separately from other states.
  const [theme, setTheme] = useState(() => 'blue')


  // 2. always operate on the previous state.
  // -> with this, the `state` here is a snapshoot of the state value when the component is rendered
  // if use it directly, then the moethod will be wrond
  // function increaseHanlder () {
  //   setState(state + 1)
  //   setState(state + 1)
  // }
  // -> with this, we always refers to the previous value correctly
  function increaseHanlder () {
    setState(previous => previous + 1)
    // setState(previous => previous + 1)
    setTheme(() => 'black')
  }

  function descreaseHanlder () {
    setState(previous => previous - 1)
    setTheme(() => 'red')
  }

  // 4. the `setState` in function component OVERWRITES the entire state object instead of merge
  // so, will need to spread the previous state values AND then change the value for the key that you want to modify
  function changeSomething() {
    setState(prevState => {
      // always want to keep the other data in the prevState,
      // otherwise, you will lose them
      return {...prevState, count: prevState.count - 1}
    })
  }

  return (
    <>
      <button onClick={descreaseHanlder}>-</button>
      <span>{state}</span>
      <span>{theme}</span>
      <button onClick={increaseHanlder} >+</button>
    </>
  )
}

export default App;
