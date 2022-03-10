import { SEND_LOGIN, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_LOGIN:
    return {
      ...state, ...action.payload,
    };
  case ADD_SCORE:
    return {
      ...state, score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
