const { body, validationResult } = require('express-validator');
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

exports.createJournal = [
  body('title', 'Title is required.').trim().notEmpty().escape(),
  body('content', 'Content is required.').trim().notEmpty().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Error while validating & sanitizing data.',
        errors: errors.array(),
        journal: {
          title: req.body.title,
          content: req.body.content,
        },
      });
    }

    const journal = new Journal({
      title: req.body.title,
      content: req.body.content,
      publish: false,
      author: req.user._id,
    });

    return journal.save((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error while saving data.' });
      }
      return res.status(200).json({ message: 'Ok', journal });
    });
  },
];
