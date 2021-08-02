import React from "react";
import { Typography } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { todoCountState } from "../recoil/atom";

const TodoCount: React.FC = () => {
  const todoCount = useRecoilValue(todoCountState);

  return (
    <Typography display="block" variant="h4">
      Your count of todos are: {todoCount}
    </Typography>
  );
};

export default TodoCount;
