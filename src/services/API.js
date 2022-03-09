const endpoint = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = async () => {
  const resolve = await fetch(endpoint);
  const data = await resolve.json();
  return data.token;
};

export default fetchToken;
