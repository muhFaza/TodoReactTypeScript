/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './App.css'
import TodoCards from './components/TodoCards'
import { useDispatch, useSelector } from 'react-redux'
import { setTodos } from './store/todolist'

function App() {
  const [todoLists, setTodoLists] = useState([])
  const todos = useSelector(state => state.todoList.todos)

  const dispatch = useDispatch()

  function reset () {
    localStorage.removeItem('LocalTodoLists')
    dispatch(setTodos([]))
  }

  useEffect(() => {

    async function fetch () {
      const todos = await axios('https://dummyjson.com/todos', {
        method: 'get'
      })
      console.log(todos.data.todos);
      dispatch(setTodos(JSON.parse(todos.data.todos)))
      localStorage.LocalTodoLists = JSON.stringify(todos.data.todos)
    }
    
    if (!localStorage.LocalTodoLists) fetch();
    else {
      dispatch(setTodos(JSON.parse(localStorage.LocalTodoLists)))
    }
  }, [])

  function filterCompletion (code) {
    if (code == 1) {
      return setTodoLists(todoLists => JSON.parse(localStorage.LocalTodoLists).filter(el => el.completed))
    }
    if (code == 2) {
      return setTodoLists(todoLists => JSON.parse(localStorage.LocalTodoLists).filter(el => !el.completed))
    }
    return setTodoLists(todoLists => JSON.parse(localStorage.LocalTodoLists))
    
  }

  function log () {
    console.log(todos);
  }

  return (
    <>
      <h1>React Typescript Todolist</h1>
      <div className="card" id="card">
        <button className='btn btn-sm btn-outline-dark' onClick={() => log()}>
          log
        </button>
        <br />
        <button className='btn btn-sm btn-danger'
        onClick={() => reset()}
        >Reset</button>
      </div>
      <div className='text-start'>
        <button className='btn btn-sm btn-primary mx-2' onClick={() => filterCompletion(0)}>All</button>
        <button className='btn btn-sm btn-primary mx-2' onClick={() => filterCompletion(1)}>Done</button>
        <button className='btn btn-sm btn-primary mx-2' onClick={() => filterCompletion(2)}>Not Done</button>
      </div>

      {todos.map((el, index) => (<TodoCards key={'todo'+index} data={el} index={index} />))}
    </>
  )
}

export default App
