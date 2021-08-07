import React from "react";
import style from "./ContactsList.module.css";
import PropTypes from "prop-types";

const ContactList = ({ contacts, deleteContacts }) => {
  return (
    <ul className={style.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={style.item}>
          <span className={style.textName}>{name}:</span>
          <span className={style.textNumber}>{number}</span>
          <button
            type="button"
            className={style.button}
            onClick={() => deleteContacts(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  deleteContacts: PropTypes.func,
};

export default ContactList;
