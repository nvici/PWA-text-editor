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
  console.log('put to the database');
  const jateDb = await openDB('jate', 1);
  const text  = jateDb.transaction('jate', 'readwrite');
  const stored = text.objectStore('jate');
  const request = stored.put({ id: 1, value: content });
  const response = await request;
  console.log('data saved to the database', response);
};


//export const getDb = async () => console.error('getDb not implemented');

export const getDb = async () => {
  console.log('GET from the database');

  //Establish a connection to the database and the desired version.
  const jateDb = await openDB('jate', 1);

  //Create a new transaction and specify the database and data privileges.
  const text = jateDb.transaction('jate', 'readonly');

  //The database and data privileges must be specified when creating a new transaction.
  const stored = text.objectStore('jate');

  //To access all the data in the database, use the.getAll() method.
  const request = stored.getAll();

  //Response from the request.
  const response = await request;
  console.log('response.value', response);
  return response;
};

initdb();
