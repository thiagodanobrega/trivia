import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestImage } from '../services/API';
import { saveLocalStorage } from '../services/LocalStorage';
import '../style/header.css';

class Header extends Component {
  render() {
    const { player, playerScore } = this.props;

    saveLocalStorage('score', playerScore);

    return (
      <section className="container-header">
        <div className="logo-game">
          <img src="logo-game.png" alt="logo do game" />
        </div>
        <div className="name-and-image">
          <img
            data-testid="header-profile-picture"
            src={ requestImage(player) }
            alt="imagem do jogador"
            className="img-user"
          />
          <div className="user-wrapper">
            <p
              data-testid="header-player-name"
              className="player-name"
            >
              {player.name}
            </p>
            <p
              data-testid="header-score"
              className="player-score"
            >
              Points:
              {' '}
              {playerScore}
            </p>
          </div>
        </div>
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
