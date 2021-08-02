import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTodos } from "../context/todo";

const AddTodo = () => {
  const { addTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const onTextUpdate = (e: any) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    addTodo({ text: newTodo, done: false });
  };

  return (
    <>
      <TextField label="Add new todo" value={newTodo} onChange={onTextUpdate} />
      <Button color="primary" disabled={!newTodo} onClick={handleAddTodo}>
        Add
      </Button>
    </>
  );
};

export default AddTodo;
