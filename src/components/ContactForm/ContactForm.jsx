import PropTypes from 'prop-types';

import { Component } from 'react';
import { nanoid } from 'nanoid';

import { Form, Label } from './ContactForm.styled';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;

    if (!this.props.contacts.find(contact => contact.name.includes(name))) {
      const contact = { id: nanoid(), name: name, number: number };

      this.setState({ name: '', number: '' });

      return this.props.onSubmitForm(contact);
    } else {
      const message = ' is already in contacts';
      alert(name + message);
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, number } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label>
          <span>Name</span>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          <span>Number</span>
          <input
            onChange={this.handleChange}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <button type="submit">Add contact</button>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onSubmitForm: PropTypes.func.isRequired,
};
