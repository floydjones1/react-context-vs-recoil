import { Typography } from "@material-ui/core";
import React from "react";
import { useTodos } from "../context/todo";

const TodoCount: React.FC = () => {
  const { todoCount } = useTodos();

  return (
    <Typography display="block" variant="h4">
      Your count of todos are: {todoCount}
    </Typography>
  );
};

export default TodoCount;
