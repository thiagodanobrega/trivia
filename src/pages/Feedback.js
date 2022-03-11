import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export class Feedback extends Component {
  redirectGame = () => {
    const { history } = this.props;
    history.push('/');
  };

  redirectRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    return (
      <div data-testid="feedback-text">
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
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Feedback;
