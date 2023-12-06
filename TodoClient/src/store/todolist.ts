import { createSlice } from "@reduxjs/toolkit";

export const todoList = createSlice({
  name: "todoList",
  initialState: {
    todos: [],
    name: 'faza',
    value: 69,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    toggleCompletion: (state, action) => {
      let temp = state.todos
      temp[action.payload].completed = !temp[action.payload].completed
      state.todos = temp
      localStorage.setItem('LocalTodoLists', JSON.stringify(state.todos))
    }
  },
});

export const { setTodos, toggleCompletion } = todoList.actions;
export default todoList.reducer