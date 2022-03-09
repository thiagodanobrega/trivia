export const SEND_LOGIN = 'SEND_LOGIN';

const sendActionLogin = (payload) => ({
  type: SEND_LOGIN,
  payload,
});

export default sendActionLogin;
