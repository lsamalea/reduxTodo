import React from "react";
import { connect } from "react-redux";

import { 
    ADD_TODO_TYPE,  
} from './reducers'

const addClickHandler = (dispatch, text) => {
  dispatch({
    type: ADD_TODO_TYPE,
    text,
    id: nextTodo++
  });
};

let nextTodo = 0;
export const AddTodo = connect()(({ dispatch }) => {
  let input;
  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            addClickHandler(dispatch, input.value);
            input.value = "";
          }
        }}
      />
      <button
        onClick={() => {
          addClickHandler(dispatch, input.value);
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </div>
  );
});

// AddTodo.contextTypes = {
//   store: PropTypes.object
// };
