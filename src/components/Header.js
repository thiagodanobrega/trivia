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
        <div className="name-and-image">
          <img
            data-testid="header-profile-picture"
            src={ requestImage(player) }
            alt="imagem do jogador"
          />
          <h1 data-testid="header-player-name">
            Player:
            {' '}
            {player.name}
          </h1>
        </div>
        <h1>Trivia</h1>
        <h3 data-testid="header-score">
          Score:
          {' '}
          {playerScore}
        </h3>
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
