import { combineReducers } from "redux";

export const SET_VISIBILITY_FILTER_TYPE = "SET_VISIBILITY_FILTER";
export const TOGGLE_TODO_TYPE = "TOGGLE_TODO";
export const ADD_TODO_TYPE = "ADD_TODO";

const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO_TYPE:
      return {
        id: action.id,
        text: action.text,
        completed: false
      };

    case TOGGLE_TODO_TYPE:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };

    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO_TYPE:
      return [...state, todo(undefined, action)];

    case TOGGLE_TODO_TYPE:
      return state.map(t => todo(t, action));

    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER_TYPE:
      return action.filter;

    default:
      return state;
  }
};

export const todoReducerApp = combineReducers({
  todos,
  visibilityFilter
});