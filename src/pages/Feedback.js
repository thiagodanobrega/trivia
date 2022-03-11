import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export class Feedback extends Component {
  renderFeedback = () => {
    const THREE = 3;
    const { assertions } = this.props;
    if (assertions < THREE) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  render() {
    return (
      <>
        <Header />
        <p data-testid="feedback-text">{this.renderFeedback()}</p>
      </>

    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
