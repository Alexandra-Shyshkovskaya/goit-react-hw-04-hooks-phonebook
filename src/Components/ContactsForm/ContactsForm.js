import { useState } from "react";
import PropTypes from "prop-types";
import style from "./ContactsForm.module.css";

function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

const handleChange = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name, number);
    resetForm();
};
  
const resetForm = () => {
    setName("");
    setNumber("");
  };

return (
      <form className={style.ContactForm} onSubmit={handleSubmit}>
        <label className={style.label}>Name</label>
        <input
          className={style.input}
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          placeholder="Введите имя"
        />
        <label className={style.labelNumber}>Number</label>
        <input
          className={style.input}
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          placeholder="Введите номер телефона"
        />
        <button type="submit" className={style.button}>
          Add contact
        </button>
      </form>
    );
  }
  
 ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}; 

export default ContactForm;

