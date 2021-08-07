import React from "react";
import style from "./Filter.module.css";
import PropTypes from "prop-types";

const Filter = ({ filter, onHandleChange }) => {
  return (
    <div>
      <h3 className={style.title}>Find contacts by name</h3>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onHandleChange}
        className={style.input}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onHandleChange: PropTypes.func,
};

export default Filter;
