import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export class Feedback extends Component {
  redirectGame = () => {
    const { history } = this.props;
    history.push('/');
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
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Feedback;
