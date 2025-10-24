const express = require('express');
const router = express.Router();
const {
  getAllTopics,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer
} = require('../controllers/topicController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllTopics);
router.get('/:identifier', getTopic);

// Admin routes
router.post('/', protect, authorize('admin'), createTopic);
router.put('/:id', protect, authorize('admin'), updateTopic);
router.delete('/:id', protect, authorize('admin'), deleteTopic);

// Q&A management routes (Admin only)
router.post('/:id/qa', protect, authorize('admin'), addQuestionAnswer);
router.put('/:id/qa/:qaId', protect, authorize('admin'), updateQuestionAnswer);
router.delete('/:id/qa/:qaId', protect, authorize('admin'), deleteQuestionAnswer);

module.exports = router;
