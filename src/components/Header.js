import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { saveLocalStorage } from '../services/LocalStorage';

class Header extends Component {
  render() {
    const { player, playerScore } = this.props;
    const hash = md5(player.gravatarEmail).toString();
    const image = `https://www.gravatar.com/avatar/${hash}`;

    saveLocalStorage('score', playerScore);

    return (
      <section>
        <h1 data-testid="header-player-name">{player.name}</h1>
        <img
          data-testid="header-profile-picture"
          src={ image }
          alt="imagem do jogador"
        />
        <h3 data-testid="header-score">{playerScore}</h3>
      </section>
    );
  }
}

const { objectOf, string } = PropTypes;

Header.propTypes = {
  player: objectOf.isRequired,
  playerScore: string.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playerScore: state.player.score,
});

export default connect(mapStateToProps)(Header);
