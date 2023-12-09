import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const todoList = createSlice({
  name: "todoList",
  initialState: {
    todos: [],
    enableDeleteMode: false,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    toggleCompletion: (state, action) => {
      let temp = state.todos;
      temp.map(todo => todo.id === action.payload ? todo.completed = !todo.completed : todo)
      state.todos = temp;
      localStorage.setItem("LocalTodoLists", JSON.stringify(state.todos));
    },
    addATodo: (state, action) => {
      let temp = state.todos;
      let ids = temp.map((todo) => todo.id);
      // find highest id
      let maxId = Math.max(...ids);

      temp.push({
        id: maxId + 1,
        todo: action.payload,
        completed: false,
      });
      state.todos = temp;
      localStorage.setItem("LocalTodoLists", JSON.stringify(state.todos));
    },
    toggleDeleteMode: (state, action) => {
      state.enableDeleteMode = !state.enableDeleteMode;
    },
    handleDeleteTodo: (state, action) => {
      let temp = state.todos
      temp = temp.filter(el => el.id != action.payload)
      state.todos = temp
      localStorage.setItem("LocalTodoLists", JSON.stringify(state.todos))
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
    }
  },
});

export const { setTodos, toggleCompletion, addATodo, toggleDeleteMode, handleDeleteTodo } =
  todoList.actions;
export default todoList.reducer;
