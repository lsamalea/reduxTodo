import { combineReducers, createStore } from "redux";

import React from "react";
import ReactDOM from "react-dom";

const SET_VISIBILITY_FILTER_TYPE = "SET_VISIBILITY_FILTER";
const TOGGLE_TODO_TYPE = "TOGGLE_TODO";
const ADD_TODO_TYPE = "ADD_TODO";

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

const todoReducerApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoReducerApp);

// components

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span> {children} </span>;
  }
  return (
    <button
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
};

const getVisiblesTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;

    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);

    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);

    default:
      return todos;
  }
};

class VisibleTodoList extends React.Component {
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { todos, visibilityFilter } = store.getState();
    const visibles = getVisiblesTodos(todos, visibilityFilter);
    return (
      <TodoList
        todos={visibles}
        onTodoClick={id => {
          store.dispatch({
            type: TOGGLE_TODO_TYPE,
            id
          });
        }}
      />
    );
  }
}

const Todo = ({ completed, text, onClick }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

const addClickHandler = (text)=>{
  store.dispatch({
    type: ADD_TODO_TYPE,
    text,
    id: nextTodo++
  });
}

const AddTodo = () => {
  
  let input;
  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            addClickHandler(input.value);
            input.value = "";
          }
        }}
      />
      <button
        onClick={() => {
          addClickHandler(input.value);
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

class FilterLink extends React.Component {
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { filter } = this.props;
    const { visibilityFilter } = store.getState();
    return (
      <Link
        active={filter === visibilityFilter}
        onClick={() => {
          store.dispatch({
            type: SET_VISIBILITY_FILTER_TYPE,
            filter
          });
        }}
        {...this.props}
      />
    );
  }
}

const Footer = () => (
  <p>
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {" "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {" "}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
);

let nextTodo = 0;
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <span> Active Filter : {visibilityFilter}</span>
  </div>
);

  ReactDOM.render(
    <TodoApp />,
    document.getElementById("root")
  );