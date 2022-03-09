export const SEND_LOGIN = 'SEND_LOGIN';
export const SEND_TOKEN = 'SEND_TOKEN';

export const sendActionLogin = (payload) => ({
  type: SEND_LOGIN,
  payload,
});

export const sendActionToken = (payload) => ({
  type: SEND_TOKEN,
  payload,
});
