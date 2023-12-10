import "react-toggle/style.css";
import Toggle from "react-toggle";
import { useSelector, useDispatch } from "react-redux";
import { setTodos, toggleCompletion, handleDeleteTodo } from "../store/todolist";
import { useState } from "react";
import ContextMenu from 'devextreme-react/context-menu';

interface TodoCardsProps {}

const TodoCards: React.FC<TodoCardsProps> = () => {
  const [contextMenu, setContextMenu] = useState({
    pos: {x: 0, y: 0},
    clicked: false,
  })
  const todos = useSelector((state) => state.todoList.todos);
  const enableDeleteMode = useSelector(state => state.todoList.enableDeleteMode);
  const dispatch = useDispatch();

  function toggle(id) {
    dispatch(toggleCompletion(id));
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
        <div className="card my-3">
          <div onContextMenu={(e) => handleContextMenu(e, index)} className="p-2 d-flex flex-row justify-content-between align-items-center">
            <div className="">
              <div onClick={toggleMaxLines} className="text-start me-3 max-lines">
                {el.todo}
              </div>
            </div>
            <div className="d-flex align-items-center">
              {enableDeleteMode ? (
              <button style={{width: 50, height: 24, padding: 0, fontSize: '14px'}} onClick={() => dispatch(handleDeleteTodo(el.id))} className="btn btn-sm btn-danger">delete</button>
              ): (<Toggle checked={el.completed} onChange={() => toggle(el.id)} />)}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default TodoCards;
