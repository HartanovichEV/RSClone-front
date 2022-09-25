import jwtDecode from 'jwt-decode';
import { showMessage } from '../../utils/showMessage';
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


export async function changeUser(user: FormData) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${SERVER}/user`, {
      method: 'PUT',
      body: user,
      headers: {
        'authorization': `Bearer ${token}`,
      },
    });
    const result = await response.json();
    const newToken = result.accessToken;
    if (response.status === 201) {
      localStorage.setItem('token', newToken );
      showMessage('Пользователь успешно изменён');
      setTimeout( () => window.location.href = process.env.USER_PAGE as string, 2500);
    } else showMessage(`Ошибка ${response.status}`, true);
  } catch (err) {
    if (err instanceof Error)
      showMessage('Проблемы с подключением к серверу', true);
  }
}


export const allUsers = await getUsers();