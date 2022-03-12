import md5 from 'crypto-js/md5';

export const fetchToken = async () => {
  const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  const resolve = await fetch(URL_TOKEN);
  const data = await resolve.json();
  return data.token;
};

export const fetchQuestions = async (token) => {
  const URL_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const resolve = await fetch(URL_QUESTIONS);
  const data = await resolve.json();
  return data.results;
};

export const requestImage = (player) => {
  const hash = md5(player.gravatarEmail).toString();
  const image = `https://www.gravatar.com/avatar/${hash}`;
  return image;
};
