const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

router.post('/:id/add_vote', optionController.addVote);
router.delete('/options/:id/delete', optionController.deleteOption);

module.exports = router;
