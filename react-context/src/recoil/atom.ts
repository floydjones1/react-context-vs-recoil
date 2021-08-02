import {atom, selector} from 'recoil'

const URL = "http://localhost:3003/todos";
const HEADERS = {
  "Content-Type": "application/json",
};
export interface ITodo {
  id?: number;
  text: string;
  done: boolean;
}


export const updateTodo = (todo: ITodo): Promise<ITodo> => {
  return fetch(`${URL}/${todo.id}`, {
    method: "PUT",
    headers: HEADERS,
  })
    .then((res) => res.json())
}

export const deleteTodo = (todo: ITodo): Promise<{}> => {
  return fetch(`${URL}/${todo.id}`, {
    method: "DELETE",
    headers: HEADERS,
    body: JSON.stringify({}),
  });
}

export const addTodo = (todo: ITodo): Promise<ITodo> => {
  return fetch(`${URL}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
}

const getTodos = (): Promise<Array<ITodo>> => {
  return fetch(URL, {
    method: "GET",
    headers: HEADERS,
  })
    .then((res) => res.json())
}

export const todosState = atom<Array<ITodo>>({
  key: 'todos',
  default: getTodos()
})

export const todoCount = selector({
  key: 'todoCount',
  get: ({get}) => {
    const todos = get(todosState)

    return todos.length
  }
})