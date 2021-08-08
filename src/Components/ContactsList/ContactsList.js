import React from "react";
import style from "./ContactsList.module.css";
import PropTypes from "prop-types";

function ContactsList({ contacts, deleteContacts }) {
  return (
    <ul className={style.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={style.item}>
          <p className={style.textName}>{name}</p>
          <p className={style.textNumber}>{number}</p>
          <button className={style.button} onClick={() => deleteContacts(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  deleteContacts: PropTypes.func,
};
export default ContactsList;