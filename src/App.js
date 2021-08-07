import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "./Components/Container/Container";
import ContactForm from "./Components/ContactsForm/ContactsForm";
import Filter from "./Components/SearchFilter/Filter";
import ContactList from "./Components/ContactsList/ContactsList";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  addContacts = (contactFormState) => {
    const { name, number } = contactFormState;
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };

    const isRepeat = this.state.contacts.find(
      ({ name }) => name === contactFormState.name
    );
    isRepeat
      ? alert(`${name} is already in contacts`)
      : this.setState((prevState) => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };
  changeFilter = (event) => {
    const { value } = event.currentTarget;
    this.setState({
      filter: value,
    });
  };
  deleteContacts = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(contacts);
    console.log(parseContacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <>
        <Container>
          <h1>Phonebook</h1>
          <ContactForm addContacts={this.addContacts} />

          <h2>Contacts</h2>
          <Filter filter={filter} onHandleChange={this.changeFilter} />
          {contacts.length === 0 ? (
            <p>There are no contacts in the phonebook. Please add contact</p>
          ) : (
            <ContactList
              contacts={visibleContacts}
              deleteContacts={this.deleteContacts}
            />
          )}
        </Container>
      </>
    );
  }
}

export default App;
