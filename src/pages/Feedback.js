import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export class Feedback extends Component {
  render() {
    const { player } = this.props;
    return (
      <div data-testid="feedback-text">
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
});

export default connect(mapStateToProps)(Feedback);
