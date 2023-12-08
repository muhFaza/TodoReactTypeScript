/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TodoCards from "./components/TodoCards";
import { useDispatch, useSelector } from "react-redux";
import { setTodos, addATodo, toggleDeleteMode } from "./store/todolist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [addTodosInput, setAddTodosInput] = useState("");
  const [formValidation, setFormValidation] = useState(0);
  const todos = useSelector((state) => state.todoList.todos);
  const enableDeleteMode = useSelector(
    (state) => state.todoList.enableDeleteMode
  );

  const dispatch = useDispatch();

  function reset() {
    localStorage.removeItem("LocalTodoLists");
    dispatch(setTodos([]));
  }

  useEffect(() => {
    async function fetch() {
      const todos = await axios("https://dummyjson.com/todos", {
        method: "get",
      });
      console.log(todos.data.todos);
      dispatch(setTodos(JSON.parse(todos.data.todos)));
      localStorage.LocalTodoLists = JSON.stringify(todos.data.todos);
    }

    if (!localStorage.LocalTodoLists) fetch();
    else {
      dispatch(setTodos(JSON.parse(localStorage.LocalTodoLists)));
    }
  }, []);

  function filterCompletion(code) {
    // if (code == 1) {
    //   return setTodoLists((todoLists) =>
    //     JSON.parse(localStorage.LocalTodoLists).filter((el) => el.completed)
    //   );
    // }
    // if (code == 2) {
    //   return setTodoLists((todoLists) =>
    //     JSON.parse(localStorage.LocalTodoLists).filter((el) => !el.completed)
    //   );
    // }
    // return setTodoLists((todoLists) => JSON.parse(localStorage.LocalTodoLists));
  }

  function log() {
    console.log(todos);
  }

  function addTodos(e) {
    e.preventDefault();
    if (!addTodosInput) {
      return setFormValidation(1);
    } else {
      setFormValidation(0);
    }
    dispatch(addATodo(addTodosInput));
    setAddTodosInput("");
    toast.success("Todo Added!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  // function toggleDeleteMode () {
  //   setEnableDeleteMode(!enableDeleteMode)
  // }

  // TESTING useEffect
  useEffect(() => {
    console.log(enableDeleteMode);
  }, [enableDeleteMode]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <h1>React Typescript Todolist</h1>
      <div className="card" id="card">
        <button className="btn btn-sm btn-dark" onClick={() => log()}>
          log
        </button>
        <br />
        <button className="btn btn-sm btn-danger" onClick={() => reset()}>
          Reset
        </button>
        <br />

        {/* FORM CREATE NEW TODO */}
        <form className="" action="" onSubmit={() => addTodos(event)}>
          <label htmlFor="todoText" className="text-start w-100">
            New Todo:
          </label>
          <input
            value={addTodosInput}
            onChange={() => setAddTodosInput(event?.target.value)}
            id="todoText"
            className={
              "form-control form-control-sm" +
              (formValidation ? " is-invalid" : "")
            }
            type="text"
          />
          <button type="submit" className="w-100 btn btn-sm btn-success my-2">
            Add
          </button>
        </form>
      </div>
      <div className="text-start">
        <button
          className="btn btn-sm btn-primary mx-1"
          onClick={() => filterCompletion(0)}
        >
          All
        </button>
        <button
          className="btn btn-sm btn-primary mx-1"
          onClick={() => filterCompletion(1)}
        >
          Done
        </button>
        <button
          className="btn btn-sm btn-primary mx-1"
          onClick={() => filterCompletion(2)}
        >
          Not Done
        </button>
        <button
          className={"btn btn-sm mx-1" + (enableDeleteMode ? ' btn-secondary' : ' btn-danger')}
          onClick={() => dispatch(toggleDeleteMode())}
        >
          {enableDeleteMode ? "Cancel" : "Delete"}
        </button>
      </div>
      <TodoCards />
    </>
  );
}

export default App;
