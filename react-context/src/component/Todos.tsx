import React, { useEffect } from "react";

import { useTodos } from "../context/todo";
import AddTodo from "./AddTodo";
import TodoCount from "./TodoCount";
import TodoList from "./TodoList";

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  main: {
    width: "100%",
    maxWidth: "400px",
    margin: "20px auto",
  },
};

const Todos: React.FC = () => {
  const { isLoading } = useTodos();

  useEffect(() => {
    console.log("mounted");
    return () => console.log("unmounted");
  }, []);

  if (isLoading) return <h3>...Loading</h3>;

  return (
    <div id="main" style={styles.main}>
      <header style={styles.header}>
        <TodoCount />
        <AddTodo />
      </header>
      <TodoList />
    </div>
  );
};

export default Todos;
