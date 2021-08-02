import React, { Suspense } from "react";

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
  return (
    <Suspense fallback="...Loading">
      <div id="main" style={styles.main}>
        <header style={styles.header}>
          <TodoCount />
          <AddTodo />
        </header>
        <TodoList />
      </div>
    </Suspense>
  );
};

export default Todos;
