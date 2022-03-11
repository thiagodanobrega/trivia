import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export class Feedback extends Component {
  redirectGame = () => {
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
          onClick={ this.redirectGame }
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
          Você acertou
          <p data-testid="feedback-total-score">{player.score}</p>
          questões!
        </h3>
        <h3>
          Um total de
          <p data-testid="feedback-total-question">{player.assertions}</p>
          pontos
        </h3>
        <p data-testid="feedback-text">{this.renderFeedback()}</p>
      <div>
    );
  }
}
const { string } = PropTypes;

Feedback.propTypes = {
  player: string.isRequired,
   history: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
};

export default connect(mapStateToProps)(Feedback);
