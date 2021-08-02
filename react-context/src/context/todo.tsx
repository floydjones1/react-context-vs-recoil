import React, { useEffect, useState } from "react";

export interface ITodo {
  id?: number;
  text: string;
  done: boolean;
}

interface State {
  isLoading?: boolean;
  todos: Array<ITodo>;
  todoCount: number;
  addTodo: (todo: ITodo) => void;
  deleteTodo: (todo: ITodo) => void;
  toggleTodo: (todo: ITodo) => void;
}

const CountContext = React.createContext<State | undefined>(undefined);

const URL = "http://localhost:3003/todos";
const HEADERS = {
  "Content-Type": "application/json",
};
const useTodos = () => {
  const context = React.useContext(CountContext);
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }
  return context;
};

const TodoProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<Array<any>>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(URL, {
      method: "GET",
      headers: HEADERS,
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const addTodo = (todo: ITodo) => {
    fetch(`${URL}`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => setTodos((todos) => [...todos, data]));
  };

  const deleteTodo = (todo: ITodo) => {
    fetch(`${URL}/${todo.id}`, {
      method: "DELETE",
      headers: HEADERS,
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.status === 200) {
        setTodos((todos) => todos.filter((t) => t.id !== todo.id));
      }
    });
  };

  const toggleTodo = (todo: ITodo) => {
    fetch(`${URL}/${todo.id}`, {
      method: "PUT",
      headers: HEADERS,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("udpated todo ", data);
        const newTodo = todos.map((t) => {
          if (t.id === todo.id) {
            return data;
          }
          return t;
        });

        setTodos(newTodo);
      });
  };

  const value = {
    todos,
    todoCount: todos.length,
    addTodo,
    deleteTodo,
    toggleTodo,
    isLoading,
  };
  return <CountContext.Provider value={value} {...props} />;
};
export { TodoProvider, useTodos };
