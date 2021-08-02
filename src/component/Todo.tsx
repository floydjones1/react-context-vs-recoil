import React from "react";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import { deleteTodo, ITodo, todoState, updateTodo } from "../recoil/atom";
import { useSetRecoilState } from "recoil";

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
  const setTodo = useSetRecoilState(todoState);
  const handleTodoToggle = (todo: ITodo) => {
    updateTodo(todo).then((updatedTodo) =>
      setTodo((prev) =>
        prev.map((p) => (p.id !== updatedTodo.id ? p : updatedTodo))
      )
    );
  };

  const handleTodoDelete = (todo: ITodo) => {
    deleteTodo(todo).then(() =>
      setTodo((prev) => prev.filter((p) => p.id !== todo.id))
    );
  };

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={!todo.done}
            onChange={() => handleTodoToggle(todo)}
          />
        }
        label={todo.text}
        style={todo.done ? styles.done : styles.label}
      />
      <Tooltip title="Delete todo" placement="top">
        <IconButton aria-label="delete" onClick={() => handleTodoDelete(todo)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Todo;
