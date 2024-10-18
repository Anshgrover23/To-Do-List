import { useDispatch, useSelector } from "react-redux";
import { GrRadialSelected } from "react-icons/gr";

import {
  setFilter,
  setSortByCategory,
  setSortByPriority,
} from "../App/Slices/todoSlice";

const SortButtons = () => {
  const dispatch = useDispatch();
  const sortByCategory = useSelector((state) => state.todos.sortbyCategory);
  const sortByPriority = useSelector((state) => state.todos.sortbyPriority);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortByCategory = () => {
    dispatch(setSortByCategory());
  };

  const handleSortByPriority = () => {
    dispatch(setSortByPriority());
  };

  return (
    <div className="flex gap-4 mb-6 font-mono">
      <button
        onClick={handleSortByCategory}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex gap-2 items-center"
      >
        Sort by Category{" "}
        <span
          className={`${sortByCategory ? "text-red-600 rounded-full" : "hidden"}`}
        >
          <GrRadialSelected />{" "}
        </span>
      </button>
      <button
        onClick={handleSortByPriority}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex gap-2 items-center"
      >
        Sort by Priority{" "}
        <span
          className={`${sortByPriority ? "text-red-600 rounded-full" : "hidden"}`}
        >
          <GrRadialSelected />{" "}
        </span>
      </button>

      <select
        onChange={handleFilterChange}
        className="p-4 border border-gray-300 rounded-lg bg-white"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default SortButtons;
