import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorage } from '../services/LocalStorage';

class Ranking extends Component {
  state = {
    ranking: [],
  }

  componentDidMount = () => {
    const ranking2 = getLocalStorage('ranking');
    const ranking = ranking2.sort((a, b) => b.score - a.score);
    this.setState({
      ranking,
    });
  }

  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectLogin }
        >
          login
        </button>
        {
          ranking.map((player, index) => (
            <div key={ index }>
              <p
                data-testid={ `player-name-${index}` }
              >
                {player.name}
              </p>
              <p
                data-testid={ `player-score-${index}` }
              >
                {player.score}
              </p>
              <img
                src={ player.picture }
                alt="imagem do jogador"
              />
            </div>
          ))
        }
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Ranking;
