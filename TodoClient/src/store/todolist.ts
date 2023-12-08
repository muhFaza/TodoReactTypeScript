import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setTodos, toggleCompletion, addATodo, toggleDeleteMode } =
  todoList.actions;
export default todoList.reducer;
