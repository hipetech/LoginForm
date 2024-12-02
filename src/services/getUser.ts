import { API_ENDPOINT } from '@env';

export const getUser = async (accessToken: string) => {
  return fetch(`${API_ENDPOINT}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
