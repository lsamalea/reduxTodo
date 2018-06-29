import React from "react";
import PropTypes from "prop-types";

import { Link } from "./link.component";
import { SET_VISIBILITY_FILTER_TYPE } from "./reducers";

export class FilterLink extends React.Component {
  componentWillMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { filter } = this.props;
    const { store } = this.context;
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

FilterLink.contextTypes = {
  store: PropTypes.object
};
