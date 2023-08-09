const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const optionController = require('../controllers/optionController');

router.post('/create', questionController.createQuestion);
router.get('/:id', questionController.viewQuestion);
router.delete('/:id', questionController.deleteQuestion);

router.post('/:id/options/create', optionController.createOption);
router.post('/options/:id/add_vote', optionController.addVote);
router.delete('/options/:id/delete', optionController.deleteOption);

module.exports = router;
