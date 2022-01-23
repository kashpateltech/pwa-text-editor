import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const textDb = await openDB('jate', 1)
  const transaction = textDb.transaction('jate', 'readwrite')
  const store = transaction.objectStore('jate')
  const request = store.put({content:content})
  const result = await request
  console.log("database updated", result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const textDb = await openDB('jate', 1)
  const transaction = textDb.transaction('jate', 'readonly')
  const store = transaction.objectStore('jate')
  const request = store.get(1);
  const result = await request
  console.log("data stored", result)
  return result?.value;
};

initdb();
