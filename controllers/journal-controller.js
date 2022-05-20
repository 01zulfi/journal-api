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

exports.getPublishedJournals = (req, res, next) => {
  Journal.find({ publish: true })
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

exports.getJournalById = (req, res, next) => {
  Journal.findById(req.params.id).exec((err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error while fetching data.' });
    }
    return res.status(200).json({
      message: 'Ok',
      journal: result,
    });
  });
};

exports.getJournalByUrlName = (req, res, next) => {
  Journal.findOne({ urlName: req.params.urlName }).exec((err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error while fetching data.' });
    }
    if (!result) {
      return res.status(404).json({ message: 'Resource not found.' });
    }
    return res.status(200).json({
      message: 'Ok',
      journal: result,
    });
  });
};

exports.createJournal = [
  body('title', 'Title is required.').trim().notEmpty(),
  body('urlName', 'Url name is required.').trim().notEmpty(),
  body('content', 'Content is required.').trim().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Error while validating & sanitizing data.',
        errors: errors.array(),
        journal: {
          title: req.body.title,
          content: req.body.content,
          publish: req.body.publish,
          urlName: req.body.urlName,
        },
      });
    }

    const journal = new Journal({
      title: req.body.title,
      urlName: req.body.urlName,
      content: req.body.content,
      publish: Boolean(req.body.publish),
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

exports.updateJournal = [
  body('title', 'Title is required.').trim().notEmpty(),
  body('urlName', 'Url name is required.').trim().notEmpty(),
  body('content', 'Content is required.').trim().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    const journal = {
      title: req.body.title,
      content: req.body.content,
      publish: Boolean(req.body.publish),
      urlName: req.body.urlName,
    };

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Error while validating & sanitizing data.',
        errors: errors.array(),
        journal,
      });
    }

    return Journal.findByIdAndUpdate(
      req.params.id,
      { ...journal },
      {},
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: 'Error while updating data.' });
        }
        return res.status(200).json({ message: 'Ok', journal: result });
      },
    );
  },
];

exports.deleteJournal = (req, res, next) => {
  Journal.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error while deleting data.' });
    }
    return res.status(200).json({ message: 'Ok' });
  });
};
