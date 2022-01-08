const { getHistory } = require('../models/history');

const getAllMessages = async (req, res) => {
  try {
    const history = await getHistory();
    res.status(200).render('index', { history });
  } catch (e) {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = { getAllMessages };
