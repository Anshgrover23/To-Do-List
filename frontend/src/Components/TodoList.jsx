import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo, updateTodo } from "../App/Slices/todoSlice";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedTime, setEditedTime] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedPriority, setEditedPriority] = useState("");

  const handleCompleteToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setEditedTask(todo.task);
    setEditedDate(todo.date);
    setEditedTime(todo.time);
    setEditedCategory(todo.category);
    setEditedPriority(todo.priority);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    dispatch(
      updateTodo({
        id: currentTodo.id,
        updatedTask: editedTask,
        updatedDate: editedDate,
        updatedTime: editedTime,
        updatedCategory: editedCategory,
        updatedPriority: editedPriority,
      }),
    );

    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto">
      {todos.length === 0 ? (
        <p className="text-2xl text-red-600">No tasks available</p>
      ) : (
        <div className="overflow-y-auto max-h-[300px] custom-scrollbar bg-gray-200 p-3 rounded-lg">
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`p-4 border rounded-lg ${
                  todo.completed ? "bg-green-400" : "bg-white"
                } rounded-xl`}
              >
                <div className="flex justify-between gap-2">
                  <div className="flex items-center gap-2 border border-black p-1 rounded-lg">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleCompleteToggle(todo.id)}
                      className="accent-pink-500"
                    />
                    <p
                      className={`text-lg ${
                        todo.completed
                          ? "line-through text-gray-500"
                          : "text-black"
                      } text-xl`}
                    >
                      {todo.task}
                    </p>

                    <span className="text-gray-500 bg-gray-700 font-mono p-1 rounded-lg">
                      {todo.category}
                    </span>

                    <span
                      className={`${
                        todo.priority === "low"
                          ? "text-green-400"
                          : todo.priority === "medium"
                            ? "text-yellow-500"
                            : todo.priority === "high"
                              ? "text-red-500"
                              : ""
                      }`}
                    >
                      {todo.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="border border-black p-1 rounded-lg">
                      {todo.time}
                    </p>
                    <p className="border border-black p-1 rounded-lg">
                      {todo.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-row-reverse">
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="text-red-600 hover:text-red-800 text-2xl"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => handleEdit(todo)}
                      className="text-yellow-600 hover:text-yellow-800 text-2xl"
                    >
                      <MdModeEdit />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-xl text-gray-600"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Todo</h2>

            <div>
              {/* Task Input */}
              <label htmlFor="task" className="block text-gray-700">
                Task:
              </label>
              <input
                type="text"
                id="task"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mt-4">
              {/* Date Input */}
              <label htmlFor="date" className="block text-gray-700">
                Date:
              </label>
              <input
                type="date"
                id="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mt-4">
              {/* Time Input */}
              <label htmlFor="time" className="block text-gray-700">
                Time:
              </label>
              <input
                type="time"
                id="time"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mt-4">
              {/* Category Input */}
              <label htmlFor="category" className="block text-gray-700">
                Category:
              </label>
              <select
                className="p-2 mt-2 border border-gray-300 rounded-lg w-full"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mt-4">
              {/* Priority Input */}
              <label htmlFor="priority" className="block text-gray-700">
                Priority:
              </label>
              <select
                id="priority"
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSave}
                disabled={
                  editedTask === currentTodo.task &&
                  editedDate === currentTodo.date &&
                  editedTime === currentTodo.time &&
                  editedCategory === currentTodo.category &&
                  editedPriority === currentTodo.priority
                }
                className={`${
                  editedTask === currentTodo.task &&
                  editedDate === currentTodo.date &&
                  editedTime === currentTodo.time &&
                  editedCategory === currentTodo.category &&
                  editedPriority === currentTodo.priority
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white py-2 px-4 rounded-lg`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      task: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      priority: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
export default TodoList;
