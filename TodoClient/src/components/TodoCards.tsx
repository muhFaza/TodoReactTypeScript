import "react-toggle/style.css";
import Toggle from "react-toggle";
import { useSelector, useDispatch } from "react-redux";
import { setTodos, toggleCompletion } from "../store/todolist";

interface TodoCardsProps {
  data: object; // Replace 'any' with the actual type of your data
}

const TodoCards: React.FC<TodoCardsProps> = ({ data, index }) => {
  const todos = useSelector(state => state.todoList.todos)
  const dispatch = useDispatch()

  function toggle(idx) {
    dispatch(toggleCompletion(idx))
    
    console.log(data);
  }

  return (
    <>
      <div className="card p-2 d-flex flex-row justify-content-between align-items-center my-3">
        <div className="">
          <div className="text-start me-3">{data.todo}</div>
        </div>
          <div className="">
            <Toggle checked={data.completed} onChange={() => toggle(index)} />
          </div>
        {/* {data.completed && (<div>
          <button className="btn btn-sm btn-danger">delete</button>
        </div>)} */}
      </div>
    </>
  );
};
export default TodoCards;
