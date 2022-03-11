import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export class Feedback extends Component {
  renderFeedback = () => {
    const THREE = 3;
    const { player } = this.props;
    if (player.assertions < THREE) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  render() {
    const { player } = this.props;
    return (
      <div>
        <Header />
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
      </div>
    );
  }
}
const { string } = PropTypes;

Feedback.propTypes = {
  player: string.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
};

export default connect(mapStateToProps)(Feedback);
