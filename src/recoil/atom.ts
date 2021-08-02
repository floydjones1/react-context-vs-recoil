import {atom, selector} from 'recoil'

export interface ITodo {
  id?: number;
  text: string;
  done: boolean;
}

const URL = "http://localhost:3003/todos";
const HEADER = {
  "Content-Type": "application/json",
};

const fetchTodos = (): Promise<Array<ITodo>> => {
  return fetch(URL, {
    method: 'GET',
    headers: HEADER
  }).then(res => res.json())
}

export const addTodo = (todo: ITodo): Promise<ITodo> => {
  return fetch(URL, {
    method: 'POST',
    headers: HEADER,
    body: JSON.stringify(todo)
  }).then(res => res.json())
}

export const updateTodo = (todo: ITodo): Promise<ITodo> => {
  return fetch(`${URL}/${todo.id}`, {
    method: 'PUT',
    headers: HEADER,
  }).then(res => res.json())
}

export const deleteTodo = (todo: ITodo): Promise<Response> => {
  return fetch(`${URL}/${todo.id}`, {
    method: 'DELETE',
    headers: HEADER,
  })
}

export const todoState = atom<Array<ITodo>>({
  key: 'todos',
  default: fetchTodos()
})

export const todoCountState = selector<number>({
  key: 'todoCount',
  get: ({get}) => {
    const todoCount = get(todoState).length
    return todoCount
  }
})