import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { player } = this.props;
    const hash = md5(player.gravatarEmail).toString();
    const image = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <section>
        <h1 data-testid="header-player-name">{player.name}</h1>
        <img
          data-testid="header-profile-picture"
          src={ image }
          alt="imagem do jogador"
        />
        <h3 data-testid="header-score">0</h3>
      </section>
    );
  }
}

const { objectOf } = PropTypes;

Header.propTypes = {
  player: objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Header);
