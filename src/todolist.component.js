import PropTypes from "prop-types";
import { connect } from "react-redux";
import React from "react";

import { getVisiblesTodos } from './helpers'
import { TOGGLE_TODO_TYPE } from "./reducers";
import { Todo } from './todo.component'

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

const mapStateToProps = state => ({
  todos: getVisiblesTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => ({
  onTodoClick: id => {
    dispatch({
      type: TOGGLE_TODO_TYPE,
      id
    });
  }
});

export const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(
  TodoList
);

VisibleTodoList.contextTypes = {
  store: PropTypes.object
};
