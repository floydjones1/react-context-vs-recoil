import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSetRecoilState } from "recoil";
import { todoState, addTodo } from "../recoil/atom";

const AddTodo = () => {
  const setTodo = useSetRecoilState(todoState);
  const [newTodo, setNewTodo] = useState("");

  const onTextUpdate = (e: any) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    addTodo({ text: newTodo, done: false }).then((todo) =>
      setTodo((prev) => [...prev, todo])
    );
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
