import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const loadTodosFromLocalStorage = () => {
  const todos = localStorage.getItem("todo-lists");
  return todos ? JSON.parse(todos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todo-lists", JSON.stringify(todos));
};

const initialState = {
  todos: loadTodosFromLocalStorage(),
  filter: "all",
  sortbyCategory: false,
  sortbyPriority: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: uuidv4(),
        date: action.payload.date,
        time: action.payload.time,
        task: action.payload.task,
        completed: false,
        category: action.payload.category,
        priority: action.payload.priority,
      });
      saveTodosToLocalStorage(state.todos);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      saveTodosToLocalStorage(state.todos);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodosToLocalStorage(state.todos);
    },
    updateTodo: (state, action) => {
      const {
        id,
        updatedTask,
        updatedDate,
        updatedTime,
        updatedCategory,
        updatedPriority,
      } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.task = updatedTask;
        todo.date = updatedDate;
        todo.time = updatedTime;
        todo.category = updatedCategory;
        todo.priority = updatedPriority;
      }
      saveTodosToLocalStorage(state.todos);
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortByCategory: (state) => {
      state.sortbyCategory = !state.sortbyCategory;
    },
    setSortByPriority: (state) => {
      state.sortbyPriority = !state.sortbyPriority;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  updateTodo,
  setFilter,
  setSortByCategory,
  setSortByPriority,
} = todoSlice.actions;
export default todoSlice.reducer;
