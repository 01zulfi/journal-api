const Journal = require('../models/journal');

exports.getJournals = (req, res, next) => {
  Journal.find({})
    .sort({ createdAt: -1 })
    .exec((err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error while fetching data.' });
      }
      if (result.length === 0) {
        return res.status(204).json({ message: 'No journals in database.' });
      }
      return res.status(200).json({
        message: 'Ok',
        journals: result,
      });
    });
};

exports.createJournal = (req, res, next) => {
  res.status(200).json({ message: 'only accessible with jwt' });
};
