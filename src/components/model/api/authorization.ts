import { showMessage } from '../../utils/showMessage';
import { UserAuth } from '../type/User';

const SERVER = process.env.SERVER as string;

export async function authorizeRequest(user: UserAuth) {
  try {
    const response = await fetch(`${SERVER}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    const token = result.accessToken;
    if (response.status === 200) {
      localStorage.setItem('token', token );
      showMessage('Вы успешно авторизованы');
      setTimeout( () => window.location.href = process.env.USER_PAGE as string, 2500);
    } else return (showMessage('Ошибка авторизации', true));
  } catch (err) {
    if (err instanceof Error)
      return console.log(err.message);
  }
}

export async function  isAuthorized() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const response = await fetch(SERVER, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    });
    return (response.status === 200) ? true : false;
  } catch (err) {
    if (err instanceof Error)
      return false;
  }
}

export async function  logout() {
  localStorage.removeItem('token');
  try {
    const response = await fetch(`${SERVER}/logout`);
    console.log(response.status);
    window.location.href = process.env.SITE_PAGE as string;
  } catch (err) {
    showMessage('Ошибка выхода', true);
  }
  
}