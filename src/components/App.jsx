import { Component } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (localStorage.getItem('Contacts')) {
      return this.setState({
        contacts: JSON.parse(localStorage.getItem('Contacts')),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const newContacts = this.state.contacts;

    if (prevContacts !== newContacts) {
      localStorage.setItem('Contacts', JSON.stringify(newContacts));
    }
  }
  hendleSubmaiForm = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  hendleChangeFiltr = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizeFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.hendleSubmaiForm} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.hendleChangeFiltr} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
