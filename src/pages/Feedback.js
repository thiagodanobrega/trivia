import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { requestImage } from '../services/API';
import { saveLocalStorage, getLocalStorage } from '../services/LocalStorage';
import { resetScore } from '../redux/actions';

export class Feedback extends Component {
  state = {
    ranking: [],
  }

  componentDidMount = () => {
    const ranking2 = getLocalStorage('ranking');

    this.setState({
      ranking: ranking2 || [],
    }, () => (
      this.setPlayerLocalStorage()
    ));
  }

  setPlayerLocalStorage = () => {
    const { player } = this.props;
    const image = requestImage(player);
    const objPlayer = {
      name: player.name,
      score: player.score,
      picture: image,
    };
    this.setState(({ ranking }) => ({
      ranking: [...ranking, objPlayer],
    }), () => {
      const { ranking } = this.state;
      saveLocalStorage('ranking', ranking);
      const { dispatch } = this.props;
      dispatch(resetScore());
    });
  }

  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  renderFeedback = () => {
    const THREE = 3;
    const { player } = this.props;
    if (player.assertions < THREE) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  redirectRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { player } = this.props;
    return (
      <div>
        <Header />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectLogin }
        >
          Play again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectRanking }
        >
          Ranking
        </button>
        <h3>
          Um total de
          <p data-testid="feedback-total-score">{player.score}</p>
          pontos
        </h3>
        <h3>
          Você acertou
          <p data-testid="feedback-total-question">{player.assertions}</p>
          questões!
        </h3>
        <p data-testid="feedback-text">{this.renderFeedback()}</p>
      </div>
    );
  }
}
const { objectOf } = PropTypes;

Feedback.propTypes = {
  player: objectOf.isRequired,
  history: PropTypes.objectOf.isRequired,
  dispatch: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
