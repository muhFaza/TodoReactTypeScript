import { configureStore } from "@reduxjs/toolkit";
import todoList from "./todolist";

export default configureStore({
  reducer: {
    todoList: todoList,
  },
});