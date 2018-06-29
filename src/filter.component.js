// import React from "react";
import { connect } from "react-redux";

import { Link } from "./link.component";
import { SET_VISIBILITY_FILTER_TYPE } from "./reducers";

const mapStateToProps = ( state, ownProps) => ({
    active : ownProps.filter === state.visibilityFilter
})

const mapDispatcherToProps = (dispatch, ownProps)=>({
    onClick : () => {
        dispatch({
          type: SET_VISIBILITY_FILTER_TYPE,
          filter : ownProps.filter
        });
      }
});

export const FilterLink = connect(
    mapStateToProps,
    mapDispatcherToProps
)(Link)
