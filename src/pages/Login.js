import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendActionToken, sendActionLogin } from '../redux/actions';
import { fetchToken } from '../services/API';
import { saveLocalStorage } from '../services/LocalStorage';

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

  handleClick = async () => {
    const { dispatch, history } = this.props;
    dispatch(sendActionLogin(this.state));
    const token = await fetchToken();
    dispatch(sendActionToken(token));
    saveLocalStorage('token', token);
    history.push('/game');
  }

  checkLogin = () => {
    const { name, gravatarEmail } = this.state;
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const MIN_LENGTH = 1;
    return (
      regex.test(gravatarEmail) && name.length >= MIN_LENGTH
    );
  }

  onClickSettingsBtn = () => {
    const { history } = this.props;
    history.push('/settings');
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
          <button
            type="button"
            onClick={ this.onClickSettingsBtn }
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.objectOf.isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default connect()(Login);
