import { STORAGE_KEY } from "@/constants";

const getList = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const saveItem = (item) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...getList(), item]));

const removeItem = (id) =>
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(getList().filter((item) => item.id !== id))
  );

const itemExists = (id) => getList().some((item) => item.id === id);

export { getList, saveItem, removeItem, itemExists };
