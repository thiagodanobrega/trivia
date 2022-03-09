import { SEND_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_TOKEN:
    return action.payload;
  default:
    return state;
  }
};

export default token;
