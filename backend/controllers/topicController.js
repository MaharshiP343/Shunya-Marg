const Topic = require('../models/Topic');

// @desc    Get all topics with optional search
// @route   GET /api/topics?search=keyword
// @access  Public
exports.getAllTopics = async (req, res) => {
  try {
    const { search, active } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { preview: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by active status
    if (active !== undefined) {
      query.isActive = active === 'true';
    } else {
      // Default: only show active topics for public
      query.isActive = true;
    }

    const topics = await Topic.find(query)
      .sort({ order: 1, createdAt: -1 })
      .select('-questionsAnswers'); // Don't send Q&A in list view

    res.status(200).json({
      success: true,
      count: topics.length,
      data: topics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching topics',
      error: error.message
    });
  }
};

// @desc    Get single topic by ID or slug
// @route   GET /api/topics/:identifier
// @access  Public
exports.getTopic = async (req, res) => {
  try {
    const { identifier } = req.params;

    // Try to find by ID first, then by slug
    let topic = await Topic.findById(identifier);

    if (!topic) {
      topic = await Topic.findOne({ slug: identifier });
    }

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.status(200).json({
      success: true,
      data: topic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching topic',
      error: error.message
    });
  }
};

// @desc    Create new topic
// @route   POST /api/topics
// @access  Private/Admin
exports.createTopic = async (req, res) => {
  try {
    const topicData = {
      ...req.body,
      createdBy: req.user.id
    };

    const topic = await Topic.create(topicData);

    res.status(201).json({
      success: true,
      message: 'Topic created successfully',
      data: topic
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A topic with this title already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating topic',
      error: error.message
    });
  }
};

// @desc    Update topic
// @route   PUT /api/topics/:id
// @access  Private/Admin
exports.updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user.id },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Topic updated successfully',
      data: updatedTopic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating topic',
      error: error.message
    });
  }
};

// @desc    Delete topic
// @route   DELETE /api/topics/:id
// @access  Private/Admin
exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    await topic.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Topic deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting topic',
      error: error.message
    });
  }
};

// @desc    Add Q&A to topic
// @route   POST /api/topics/:id/qa
// @access  Private/Admin
exports.addQuestionAnswer = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    topic.questionsAnswers.push(req.body);
    await topic.save();

    res.status(201).json({
      success: true,
      message: 'Question & Answer added successfully',
      data: topic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding Q&A',
      error: error.message
    });
  }
};

// @desc    Update Q&A in topic
// @route   PUT /api/topics/:id/qa/:qaId
// @access  Private/Admin
exports.updateQuestionAnswer = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    const qa = topic.questionsAnswers.id(req.params.qaId);

    if (!qa) {
      return res.status(404).json({
        success: false,
        message: 'Question & Answer not found'
      });
    }

    Object.assign(qa, req.body);
    await topic.save();

    res.status(200).json({
      success: true,
      message: 'Question & Answer updated successfully',
      data: topic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating Q&A',
      error: error.message
    });
  }
};

// @desc    Delete Q&A from topic
// @route   DELETE /api/topics/:id/qa/:qaId
// @access  Private/Admin
exports.deleteQuestionAnswer = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    topic.questionsAnswers.pull(req.params.qaId);
    await topic.save();

    res.status(200).json({
      success: true,
      message: 'Question & Answer deleted successfully',
      data: topic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting Q&A',
      error: error.message
    });
  }
};
