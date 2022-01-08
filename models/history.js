const connection = require('./connection');

const createHistory = async (message, nickname, date) => {
  const db = await connection();
  await db.collection('messages').insertOne({ message, nickname, timestamp: date });
};

const getHistory = async () => {
  const db = await connection();
  const history = db.collection('messages').find({}).toArray();
  return history;
};

module.exports = {
  createHistory,
  getHistory,
};
