// import React from "react";
import { connect } from "react-redux";

import { Link } from "./link.component";
import { setVisibilityFilter } from "./action.creators";

const mapStateToProps = ( state, ownProps) => ({
    active : ownProps.filter === state.visibilityFilter
})

const mapDispatcherToProps = (dispatch, ownProps)=>({
    onClick : () => {
        dispatch(
            setVisibilityFilter(ownProps.filter)
        );
      }
});

export const FilterLink = connect(
    mapStateToProps,
    mapDispatcherToProps
)(Link)
