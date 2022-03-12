export const SEND_LOGIN = 'SEND_LOGIN';
export const SEND_TOKEN = 'SEND_TOKEN';
export const ADD_SCORE = 'ADD_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

export const sendActionLogin = (payload) => ({
  type: SEND_LOGIN,
  payload,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});

export const sendActionToken = (payload) => ({
  type: SEND_TOKEN,
  payload,
});

export const addScoreAction = (payload) => ({
  type: ADD_SCORE,
  payload,
});
