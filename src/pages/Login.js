import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sendActionLogin from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
  }

  handleChange = ({ target: { value, id } }) => {
    this.setState({
      [id]: value,
    });
  }

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(sendActionLogin(this.state));
  }

  checkLogin = () => {
    const { name, gravatarEmail } = this.state;
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const MIN_LENGTH = 1;
    return (
      regex.test(gravatarEmail) && name.length >= MIN_LENGTH
    );
  }

  render() {
    return (
      <section>
        <form onChange={ this.handleChange }>
          <label htmlFor="name">
            Nome do Jogador:
            <input
              id="name"
              type="text"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="gravatarEmail">
            Email do Gravatar:
            <input
              id="gravatarEmail"
              type="text"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !this.checkLogin() }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.objectOf.isRequired,
};

export default connect()(Login);
