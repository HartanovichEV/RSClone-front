import jwtDecode from 'jwt-decode';
import { UserVisualData } from '../type/User';

const SERVER = process.env.SERVER as string;

export function getAuthUserData() : UserVisualData | false {
  const token: string | null = localStorage.getItem('token');
  if (!token) return false;
  return jwtDecode(token);
}

export async function  getUsers() {
  try {
    const response = await fetch(`${SERVER}/user`);
    const result : UserVisualData[] = await response.json();
    return result;
  } catch (err) {
    return [];   
  }
}

export const allUsers = await getUsers();