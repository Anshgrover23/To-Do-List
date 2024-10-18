import { IoIosAddCircleOutline } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { addTodo } from "../App/Slices/todoSlice";
import { useState } from "react";

const TodoForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const handleAddTodo = () => {
    const newTodo = {
      task,
      date,
      time,
      category,
      priority,
      completed: false,
    };

    dispatch(addTodo(newTodo));
    setTask("");
    setDate("");
    setTime("");
    setCategory("");
    setPriority("");
  };

  const handleCancel = () => {
    setTask("");
    setDate("");
    setTime("");
    setCategory("");
    setPriority("");
  };

  return (
    <div className="p-6 bg-gray-300 rounded-lg shadow-lg mb-5">
      <input
        type="text"
        placeholder="Share Your Thoughts"
        className="w-full p-2 mb-2 border border-gray-300 rounded-lg text-xl"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          className="p-3 border border-gray-300 rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="p-3 border border-gray-300 rounded-lg"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="other">Other</option>
        </select>
        <select
          className="p-3 border border-gray-300 rounded-lg"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="flex justify-around">
        <button
          onClick={handleAddTodo}
          className="px-6 py-3 bg-green-500 text-white font-mono rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <IoIosAddCircleOutline /> Add
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-red-500 text-white rounded-lg font-mono hover:bg-red-600 flex items-center gap-2"
        >
          <GiCancel /> Cancel
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
