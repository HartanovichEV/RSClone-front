import validator from 'validator';
import { showMessage } from '../../utils/showMessage';
import { User } from '../interfaces/User';


export function registerValidation(user: User ) {
  if (!validator.isEmail(user.email)) return { err: true, message: 'Такой email недопустим' };
  if (!user.login.match(/[A-Za-z0-9]+/)) return { err: true, message: 'Такой логин недопустим' };
  if (!validator.isStrongPassword(user.pwd,
    {
      minLength: 6,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    })) return { err: true, message: 'Такой пароль недопустим' };

  return { err: false };
}

export async function registerRequest(user: User) {
  const port = process.env.SERVER_PORT || 3000;
  try {
    const response = await fetch(`http://localhost:${port}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    //const result = await response.json();
    if (response.status === 201) {
      showMessage('Пользователь успешно зарегистрирован');
    } else showMessage(`Ошибка ${response.status}`, true);
  } catch (err) {
    if (err instanceof Error)
      showMessage('Проблемы с подключением к серверу', true);
  }
}