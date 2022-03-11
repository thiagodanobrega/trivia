import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocalStorage, saveLocalStorage } from '../services/LocalStorage';
import { sendActionToken, addScoreAction } from '../redux/actions';
import { fetchQuestions, fetchToken } from '../services/API';
import Header from '../components/Header';
import './ScreenGame.css';

class ScreenGame extends Component {
  state ={
    questionsList: [],
    index: 0,
    answerList: [],
    isAnswered: false,
    time: 30,
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    const token = getLocalStorage('token');
    dispatch(sendActionToken(token));
    this.getQuestions();
    this.handleTimer();
  }

  getToken = async () => {
    const { dispatch } = this.props;
    const tokenAPI = await fetchToken();
    dispatch(sendActionToken(tokenAPI));
    saveLocalStorage('token', tokenAPI);
    const questionsList = await fetchQuestions(tokenAPI);
    return questionsList;
  }

  getQuestions = async () => {
    const { token } = this.props;
    let questionsList = await fetchQuestions(token);
    if (questionsList.length === 0) {
      questionsList = this.getToken();
    }
    console.log(questionsList);
    this.setState({ questionsList });
    this.organizeAnswers();
  }

  increaseIndex = () => {
    this.setState((prev) => ({
      index: prev.index + 1,
      isAnswered: false,
    }), () => {
      this.organizeAnswers();
    });
  }

  shuffleAnswers = (answerList) => {
    for (let i = answerList.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [answerList[i], answerList[j]] = [answerList[j], answerList[i]];
    }
    this.setState({
      answerList,
    });
  }

  organizeAnswers = () => {
    const { questionsList, index } = this.state;
    const answerList = [
      { res: questionsList[index].correct_answer, test: 'correct-answer' },
    ];
    questionsList[index].incorrect_answers.forEach((element, indexAnswers) => {
      const obj = { res: element, test: `wrong-answer-${indexAnswers}` };
      answerList.push(obj);
    });
    this.shuffleAnswers(answerList);
  };

  verifyDifficulty = () => {
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    const { questionsList, index } = this.state;
    switch (questionsList[index].difficulty) {
    case 'easy':
      return ONE;
    case 'medium':
      return TWO;
    case 'hard':
      return THREE;
    default:
      return 0;
    }
  }

  checkAnswer = (answer) => {
    const ONE = 1;
    const TEN = 10;

    this.setState({ isAnswered: true });
    const { dispatch } = this.props;
    if (answer === 'correct-answer') {
      const difficulty = this.verifyDifficulty();
      const timer = ONE;
      const score = TEN + (difficulty * timer);
      dispatch(addScoreAction(score));
    }
  }

  handleTimer = () => {
    const oneSecund = 1000;
    const timer = setInterval(() => {
      this.setState(({ time }) => ({
        time: time - 1,
      }), () => {
        const { time } = this.state;
        if (time === 0) {
          clearInterval(timer);
          this.setState({
            isAnswered: true,
          });
        }
      });
    }, oneSecund);
  }

  render() {
    const { questionsList, index, answerList, isAnswered, time } = this.state;
    return (
      <div>
        <Header />
        <p>{ time }</p>
        {questionsList.length > 0 ? (
          <div>
            <p data-testid="question-category">{questionsList[index].category}</p>
            <p data-testid="question-text">{questionsList[index].question}</p>
            <div data-testid="answer-options">
              {answerList.map(({ res, test }) => (
                <button
                  type="button"
                  key={ test }
                  className={ isAnswered && test.split('-')[0] }
                  data-testid={ test }
                  onClick={ () => this.checkAnswer(test) }
                  disabled={ isAnswered }
                >
                  {res}
                </button>
              ))}
              {
                isAnswered && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.increaseIndex }
                  >
                    Next
                  </button>
                )
              }
            </div>
          </div>
        ) : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

ScreenGame.propTypes = {
  dispatch: PropTypes.objectOf.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ScreenGame);
