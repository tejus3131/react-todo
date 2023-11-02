import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

function App() {

  let todos = JSON.parse(localStorage.getItem("todos") || "null");
  if (!todos || todos === "null") {
    localStorage.setItem('todos', JSON.stringify([]));
    todos = [];
  }

  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState(todos as any[]);

  function saveTodoList(todoArray: any) {
    setTodoList(todoArray);
    localStorage.setItem("todos", JSON.stringify(todoArray));
  }

  function addTodo() {
    if (!todo) {
      alert("Todo cannot be empty");
      return;
    } else {
      let copy = false;
      todoList.forEach((todo_data) => {
        if (todo_data.text === todo) {
          copy = true;
        }
      });
      if (copy) {
        alert("Todo already exists");
        return;
      } else {
        const todo_item = {
          id: Math.random(),
          text: todo,
        };
        saveTodoList([...todoList, todo_item]);
        setTodo('');
      }
    }
  }

  function deleteTodo(id: any) {
    const updated_todoList = todoList.filter((todo_data) => todo_data.id !== id);
    saveTodoList(updated_todoList);
  }

  return (
    <>
      <h1 className="p-3 text-center bg-dark text-white">Todo List</h1>
      <div className="container d-flex my-5">
        <input
          className="form-control mx-3"
          type="text"
          placeholder="Add Todo"
          aria-label="add todo input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        ></input>
        <button
          type="button"
          className="btn btn-outline-primary w-25"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      {todoList.length > 0 ? (
        <div className="container">
          <table className="table align-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" className="w-50">Title</th>
                <th scope="col" className="w-25 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((todo, index) => {
                return (
                  <tr key={todo.id}>
                    <td className="w-25 mx-5" scope="row">{index + 1}</td>
                    <td className="w-50 mx-5">{todo.text}</td>
                    <td className="w-25 mx-5">
                      <button
                        type="button"
                        className="btn btn-outline-danger w-100"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
          <div className="container">
            <h3 className="text-center">No Todos</h3>
          </div>
      )}
    </>
  );
}

export default App;
