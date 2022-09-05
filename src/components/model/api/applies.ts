import { showMessage } from '../../utils/showMessage';
import { Apply } from '../type/type';

const SERVER = process.env.SERVER as string;

export async function  getApplies() {
  try {
    const response = await fetch(`${SERVER}/apply`);
    const result : Apply[] = await response.json();
    return result;
  } catch (err) {
    if (err instanceof Error)
      return err;   
  }
}


export async function  getApply(applyId: number) : Promise<Apply[]> {
  try {
    const response = await fetch(`${SERVER}/apply/${applyId}`);
    const result : Apply[] = await response.json();
    return result;
  } catch (err) {
    if (err instanceof Error)
      return [];   
  }
  return [];
}


export async function  createApply(apply: Apply) {
  try {
    console.log(apply);
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
      return showMessage('Заявка успешно создана');
    } else return  showMessage(`Ошибка ${response.status}`, true);
  } catch (err) {
    if (err instanceof Error)
      return showMessage('Проблемы с подключением к серверу', true);
  }
}

export async function  closeApply(applyId: number, message = 'Заявка успешно закрыта') {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${SERVER}/apply/${applyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      showMessage(message);
    } else showMessage(`Ошибка ${response.status}`, true);
  } catch (err) {
    if (err instanceof Error)
      showMessage('Проблемы с подключением к серверу', true);
  }
}

export async function participateInApply(applyId: number ) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${SERVER}/participate/${applyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      showMessage('Заявка на помощь подана');
    } else showMessage(`Ошибка ${response.status}`, true);
  } catch (err) {
    if (err instanceof Error)
      showMessage('Проблемы с подключением к серверу', true);
  }
}

export async function removeParticipation(applyId: number ) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${SERVER}/participate/${applyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      showMessage('Заявка на помощь убрана');
    } else showMessage(`Ошибка ${response.status}`, true);
  } catch (err) {
    if (err instanceof Error)
      showMessage('Проблемы с подключением к серверу', true);
  }
}

