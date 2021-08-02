import React from "react";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import { useTodos } from "../context/todo";
import Todo from "./Todo";

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    padding: "20px",
    margin: "20px 0",
  },
  todo: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
  },
  divider: {
    position: "absolute",
    width: "100%",
    top: 0,
  },
};

const TodoList = () => {
  const { todos } = useTodos();

  return (
    <>
      {todos.length > 0 && (
        <Card style={styles.card}>
          <FormGroup>
            {todos.map((todo, index) => (
              <div key={todo.id} style={styles.todo}>
                {index > 0 ? <Divider style={styles.divider} /> : ""}
                <Todo {...todo} />
              </div>
            ))}
          </FormGroup>
        </Card>
      )}
    </>
  );
};

export default TodoList;
