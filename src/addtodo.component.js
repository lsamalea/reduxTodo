import React from "react";
import PropTypes from 'prop-types';

import { 
    ADD_TODO_TYPE,  
} from './reducers'

const addClickHandler = (store, text) => {
  store.dispatch({
    type: ADD_TODO_TYPE,
    text,
    id: nextTodo++
  });
};

let nextTodo = 0;
export const AddTodo = (props, { store }) => {
  let input;
  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            addClickHandler(store, input.value);
            input.value = "";
          }
        }}
      />
      <button
        onClick={() => {
          addClickHandler(store, input.value);
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

AddTodo.contextTypes = {
  store: PropTypes.object
};
