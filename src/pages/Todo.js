import { IoIosAddCircle } from "react-icons/io";
import { FaTrash, FaEdit, FaRegSave } from "react-icons/fa";
import { useContext } from "react";
import { StoreContext } from "../context/Store";
import "../css/Todo.css";

  function Todo() {
    const { tasks,
      newTask,
      setNewTask,
      editIndex,
      editText,
      setEditText,
      handleAddTask,
      handleToggleTask,
      handleSaveEdit,
      handleEditTask,
      handleDeleteTask} = useContext(StoreContext);

  return (
    <div>
      <h1>..TO DO LIST..</h1>
      <div className="searchbar">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
             handleAddTask();
            }
          }}
          placeholder="Enter new task"
        />
        <button onClick={handleAddTask}><IoIosAddCircle /></button>
      </div>
      <ul id="taskList">
        {tasks.map((task, index) => (
          <li key={task.id || index}>
            <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(index)}
              />
              {editIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <label className={task.completed ? "strikeTaskItem" : ""}>
                  {task.text}
                </label>
              )}
            </div>
            {editIndex === index ? (
              <button onClick={() => handleSaveEdit(index)}><FaRegSave /></button>
            ) : (
              <button onClick={() => handleEditTask(index)}><FaEdit /></button>
            )}
            <button onClick={() => handleDeleteTask(index)}><FaTrash /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Todo;