import React from "react";
import { connect } from "react-redux";
import {addTodo} from "./action.creators";

let nextTodo = 0;
const addClickHandler = (dispatch, text) => {
  dispatch(addTodo(text, nextTodo++));
};

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
