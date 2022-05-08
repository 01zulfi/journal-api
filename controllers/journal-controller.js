exports.getJournals = (req, res, next) => {
  res.status(200).json({ message: 'get journals wohoo' });
};

exports.createJournal = (req, res, next) => {
  res.status(200).json({ message: 'only accessible with jwt' });
};
