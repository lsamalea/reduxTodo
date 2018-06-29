import React from 'react'
import { FilterLink } from './filter.component'

export const Footer = () => (
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
  