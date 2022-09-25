export default class LocalStorage {
  
  save<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  fetch(key: string) {
    const data = localStorage.getItem(key);
    if (data === null)
      return false;
    let daTa;
    try {
      daTa = JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return daTa;
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}