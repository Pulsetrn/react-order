// Функции, которые работают с local storage посредством redux
export function loadState<T>(key: string): T | undefined {
  try {
    const jsonState = localStorage.getItem(key);
    if (!jsonState) {
      return undefined;
    } else {
      return JSON.parse(jsonState);
    }
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export function saveState<T>(key: string, state: T) {
  try {
    const stringState = JSON.stringify(state);
    localStorage.setItem(key, stringState);
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
