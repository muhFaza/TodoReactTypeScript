import "react-toggle/style.css";
import Toggle from "react-toggle";
import { useSelector, useDispatch } from "react-redux";
import { setTodos, toggleCompletion } from "../store/todolist";
import { useState } from "react";
import ContextMenu from 'devextreme-react/context-menu';

interface TodoCardsProps {}

const TodoCards: React.FC<TodoCardsProps> = () => {
  const [contextMenu, setContextMenu] = useState({
    pos: {x: 0, y: 0},
    clicked: false,
  })
  const todos = useSelector((state) => state.todoList.todos);
  const dispatch = useDispatch();

  function toggle(idx) {
    dispatch(toggleCompletion(idx));
  }

  function toggleMaxLines(e) {
    let classNameIndex = e.target.className.split(" ").indexOf("max-lines");
    let className = e.target.className.split(" ");
    if (classNameIndex != -1) className.splice(classNameIndex, 1);
    else className.push("max-lines");
    e.target.className = className.join(" ");
  }

  function handleContextMenu (e, idx) {

  }

  return (
    <>
      {todos.map((el, index) => (
        <div onContextMenu={(e) => handleContextMenu(e, index)} className="card p-2 d-flex flex-row justify-content-between align-items-center my-3">
          <div className="">
            <div onClick={toggleMaxLines} className="text-start me-3 max-lines">
              {el.todo}
            </div>
          </div>
          <div className="">
            <Toggle checked={el.completed} onChange={() => toggle(index)} />
          </div>
          {/* {data.completed && (<div>
          <button className="btn btn-sm btn-danger">delete</button>
        </div>)} */}
        </div>
      ))}
    </>
  );
};
export default TodoCards;
