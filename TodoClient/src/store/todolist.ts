import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const todoList = createSlice({
  name: "todoList",
  initialState: {
    todos: [],
    enableDeleteMode: false,
    filterState: 0,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    toggleCompletion: (state, action) => {
      let temp = state.todos;
      temp.map(todo => todo.id === action.payload ? todo.completed = !todo.completed : todo)
      let tempStorage = JSON.parse(localStorage.getItem("LocalTodoLists"));
      tempStorage.map(todo => todo.id === action.payload ? todo.completed = !todo.completed : todo)
      state.todos = temp;
      localStorage.setItem("LocalTodoLists", JSON.stringify(tempStorage));
      
    },
    addATodo: (state, action) => {
      let temp = state.todos;
      let tempStorage = JSON.parse(localStorage.getItem("LocalTodoLists"));
      let ids = tempStorage.map((todo) => todo.id);
      // find highest id
      let maxId = Math.max(...ids);

      if (state.filterState != 1) {
        temp.push({
          id: maxId + 1,
          todo: action.payload,
          completed: false,
        });
        state.todos = temp;
      }

      tempStorage.push({
        id: maxId + 1,
        todo: action.payload,
        completed: false,
      })
      localStorage.setItem("LocalTodoLists", JSON.stringify(tempStorage));
    },
    toggleDeleteMode: (state, action) => {
      state.enableDeleteMode = !state.enableDeleteMode;
    },
    handleDeleteTodo: (state, action) => {
      let temp = state.todos;
      temp = temp.filter(el => el.id != action.payload)
      let tempStorage = JSON.parse(localStorage.getItem("LocalTodoLists"));
      tempStorage = tempStorage.filter(el => el.id != action.payload)
      state.todos = temp
      localStorage.setItem("LocalTodoLists", JSON.stringify(tempStorage))
      toast.error("Todo Deleted!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
    filterTodos: (state, action) => {
      state.filterState = action.payload;
      let temp = JSON.parse(localStorage.getItem("LocalTodoLists"));
      if (state.filterState == 0) {
        state.todos = temp;
      } else if (state.filterState == 1) {
        state.todos = temp.filter(todo => todo.completed == true)
      } else {
        state.todos = temp.filter(todo => todo.completed == false)
      }
    }
  },
});

export const { setTodos, toggleCompletion, addATodo, toggleDeleteMode, handleDeleteTodo, filterTodos } =
  todoList.actions;
export default todoList.reducer;
