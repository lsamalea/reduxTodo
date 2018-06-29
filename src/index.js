import { createStore } from "redux";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import { AddTodo } from "./addtodo.component";
import { VisibleTodoList } from "./todolist.component";
import { Footer } from "./footer.component";
import { todoReducerApp } from "./reducers";

// components
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

ReactDOM.render(
  <Provider store={createStore(todoReducerApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
