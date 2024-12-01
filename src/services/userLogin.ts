import { Credentials } from '../types/User.ts';

export const userLogin = async (
  { username, password }: Credentials,
  expiredInMins = 5,
) => {
  return fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiredInMins,
    }),
    credentials: 'include',
  })
    .then(res => res.json())
    .then(res => {
      if (res.message) {
        throw new Error(res.message);
      }
      return res;
    })
    .catch(error => {
      throw new Error(error);
    });
};
