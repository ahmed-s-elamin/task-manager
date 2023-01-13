import { useState, useEffect } from "react";

const api = "http://localhost:3030";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [popup, setPopup] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch(api + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("error: " + err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(api + "/todos/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(api + "/todos/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json);

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  const addTodo = async () => {
    const data = await fetch(api + "/todos/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);

    setPopup(false);

    setNewTodo("");
  };

  return (
    <div className="App">
      <h1>Welcome!</h1>
      <h2>your tasks</h2>
      <div className="todos">
        {todos.map((todo) => (
          <div
            className={"todo " + (todo.complete ? "is-complete" : "")}
            key={todo._id}
          >
            <input
              type="checkbox"
              className="checkbox"
              onClick={() => completeTodo(todo._id)}
            />
            <div className="text">{todo.text}</div>
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              delete
            </div>
          </div>
        ))}
      </div>

      <div className="addPopup" onClick={() => setPopup(true)}>
        +
      </div>

      {popup ? (
        <div className="popup">
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="addTodoInput"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <button className="button" onClick={addTodo}>
              done
            </button>
            <button className="closePopup" onClick={() => setPopup(false)}>
              cancel
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
