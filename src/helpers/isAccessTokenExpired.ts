import { jwtDecode } from 'jwt-decode';

export const isAccessTokenExpired = (token: string) => {
  const { exp } = jwtDecode(token);
  return !exp || exp < Date.now() / 1000;
};
