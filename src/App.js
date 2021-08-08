import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "./Components/Container";
import ContactForm from "./Components/ContactsForm";
import Filter from "./Components/SearchFilter";
import ContactList from "./Components/ContactsList";

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue,
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContacts = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContacts = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };
  
  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes( normalizedFilter),
    );
  };

  return (
    <>
      <Container>
        <h1>Phonebook</h1>
      <ContactForm onSubmit={addContacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onHandleChange={changeFilter} />
      {contacts.length === 0 ? (
          <p>There are no contacts in the phonebook. Please add contact</p>
        ) : (
          <ContactList
            contacts={visibleContacts()}
            deleteContacts={deleteContacts}
          />
        )}
    </Container>
    </>
  );
}

export default App;