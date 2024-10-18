import { useSelector } from "react-redux";
import TodoForm from "./components/TodoForm";
import SortButtons from "./components/SortButton";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const sortByCategory = useSelector((state) => state.todos.sortbyCategory);
  const sortByPriority = useSelector((state) => state.todos.sortbyPriority);

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
  });

  // Sort by category
  const sortedByCategory = sortByCategory
    ? [...filteredTodos].sort((a, b) => a.category.localeCompare(b.category))
    : filteredTodos;

  // Sort by priority
  const sortedByPriority = sortByPriority
    ? [...sortedByCategory].sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
    : sortedByCategory;

  return (
    <div
      className="bg-custom-gradient h-screen flex flex-col items-center justify-center"
      id="root"
    >
      <h1 className="text-5xl text-yellow-600 font-mono font-semibold text-center animate-bounce mb-10">
        Todo-List
      </h1>
      <TodoForm />
      <SortButtons />
      <TodoList todos={sortedByPriority} />
      <Footer />
    </div>
  );
};

export default App;
