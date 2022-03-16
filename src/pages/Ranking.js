import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GiTrophy } from 'react-icons/gi';
import { getLocalStorage } from '../services/LocalStorage';
import '../style/ranking.css';

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
      <div className="main-ranking">
        <div className="container-ranking">
          <h1
            className="title-ranking"
            data-testid="ranking-title"
          >
            <GiTrophy className="trophy" />
            LOADERBOARD
          </h1>
          {
            ranking.map((player, index) => (
              <div className="raking-container" key={ index }>
                <div className={ `score style${index + 1}` }>{index + 1}</div>
                <div
                  className="player-ranking"
                >
                  <img
                    className="picture-ranking"
                    src={ player.picture }
                    alt="imagem do jogador"
                  />
                  <div className="name-score-container">
                    <p
                      className="name-ranking"
                      data-testid={ `player-name-${index}` }
                    >
                      {player.name}
                    </p>
                    <p
                      className="score-ranking"
                      data-testid={ `player-score-${index}` }
                    >
                      points:
                      {' '}
                      {player.score}
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
          <button
            type="button"
            className="btn-ranking"
            data-testid="btn-go-home"
            onClick={ this.redirectLogin }
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Ranking;
