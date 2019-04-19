import { User } from '../models';

const USER = 'user';

export const getUser = (): User | undefined => {
  const data = window.localStorage.getItem(USER);
  return data ? JSON.parse(data) : undefined;
}

export const setUser = (user: User) => window.localStorage.setItem(USER, JSON.stringify(user));

export const removeUser = () => window.localStorage.removeItem(USER);