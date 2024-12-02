import type { LoginCredentials } from '../types/LoginCredentials.ts';
import { API_ENDPOINT } from '@env';

export const userLogin = async (
  { username, password }: LoginCredentials,
  expiredInMins = 5,
) => {
  return fetch(`${API_ENDPOINT}/auth/login`, {
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
