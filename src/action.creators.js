import { ADD_TODO_TYPE, SET_VISIBILITY_FILTER_TYPE, TOGGLE_TODO_TYPE } from "./reducers";

export const addTodo = (text, id) => ({
  type: ADD_TODO_TYPE,
  text,
  id
});

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER_TYPE,
  filter
});

export const toogleTodo = id =>({
  type: TOGGLE_TODO_TYPE,
  id
});