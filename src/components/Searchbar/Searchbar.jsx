import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  onChangeInput = evt => {
    this.setState({ query: evt.currentTarget.value.toLowerCase() });
  };

  onSubmitForm = evt => {
    evt.preventDefault();

    const { query } = this.state;
    const { onSubmit } = this.props;

    if (query.trim() === '') {
      Notiflix.Notify.failure(
        'Please enter something first to search for images!'
      );
      return;
    }

    onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={css.header}>
        <form onSubmit={this.onSubmitForm} className={css.form}>
          <button type="submit" className={css.button}>
            <ImSearch size={15} />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.onChangeInput}
          />
        </form>
      </header>
    );
  }
}
