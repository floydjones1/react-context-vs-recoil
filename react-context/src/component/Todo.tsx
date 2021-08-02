import React from "react";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import { ITodo, useTodos } from "../context/todo";

const styles: { [key: string]: React.CSSProperties } = {
  done: {
    textDecoration: "line-through",
    opacity: ".5",
    display: "flex",
    width: "100%",
  },
  label: {
    display: "flex",
    width: "100%",
  },
};

const Todo: React.FC<ITodo> = (todo) => {
  const { toggleTodo, deleteTodo } = useTodos();
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={!todo.done}
            onChange={() => toggleTodo(todo)}
          />
        }
        label={todo.text}
        style={todo.done ? styles.done : styles.label}
      />
      <Tooltip title="Delete todo" placement="top">
        <IconButton aria-label="delete" onClick={() => deleteTodo(todo)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Todo;
