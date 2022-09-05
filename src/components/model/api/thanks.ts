import { showMessage } from "../../utils/showMessage";
import { Thanks } from "../type/type";

const SERVER = process.env.SERVER;

export async function  getThanks() {
  try {
    const response = await fetch(`${SERVER}/thanks`);
    const result : Thanks[] = await response.json();
    return result;
  } catch (err) {
      return [];   
  }
}

export async function  createThanks(apply: Thanks) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${SERVER}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(apply),
    });
    if (response.status === 200) {
      showMessage('Благодарность успешно создана');
    } else showMessage(`Ошибка ${response.status}`, true);
  } catch (err) {
    if (err instanceof Error)
      showMessage('Проблемы с подключением к серверу', true);
  }
}

export const allThanks = getThanks();