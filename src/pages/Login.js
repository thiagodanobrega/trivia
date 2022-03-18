import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiFillSetting } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { sendActionToken, sendActionLogin } from '../redux/actions';
import { fetchToken } from '../services/API';
import { saveLocalStorage } from '../services/LocalStorage';
import '../style/login.css';

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
      <section className="container">
        <img src="logo-game.png" alt="logo" />
        <form onChange={ this.handleChange } className="form">
          <h1 className="title-login">Play Now!</h1>
          <label htmlFor="name" className="label">
            Player:
            <input
              id="name"
              className="input-name"
              type="text"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="gravatarEmail" className="label">
            Email:
            <input
              id="gravatarEmail"
              className="input-name"
              type="text"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            className="btn-login"
            disabled={ !this.checkLogin() }
            onClick={ this.handleClick }
          >
            Play
            <BsFillPlayFill className="play-icon" />
          </button>
          <button
            type="button"
            onClick={ this.onClickSettingsBtn }
            className="btn-settings"
            data-testid="btn-settings"
          >
            Settings
            <AiFillSetting />
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
