import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TopicCard.css';

const TopicCard = ({ topic, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showQA, setShowQA] = useState(false);
  const [selectedQA, setSelectedQA] = useState(null);

  const handleCardClick = () => {
    if (!showQA && !selectedQA) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleShowQuestions = (e) => {
    e.stopPropagation();
    setShowQA(true);
  };

  const handleQuestionClick = (qa, e) => {
    e.stopPropagation();
    setSelectedQA(selectedQA?.question === qa.question ? null : qa);
  };

  const handleExplore = (e) => {
    e.stopPropagation();
    onClick(topic);
  };

  return (
    <div className="topic-card-container">
      <motion.div
        className={`topic-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleCardClick}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -10 }}
      >
        <div className="card-inner">
          {/* Front Side */}
          <div className="card-face card-front">
            <div className="card-icon">{topic.icon}</div>
            <h3 className="card-title">{topic.title}</h3>
            <p className="card-preview">{topic.preview}</p>
          </div>

          {/* Back Side */}
          <div className="card-face card-back">
            {!showQA ? (
              <>
                <h3 className="card-back-title">{topic.title}</h3>
                <p className="card-description">{topic.description}</p>
                <div className="card-actions">
                  <button className="btn-explore" onClick={handleExplore}>
                    Explore Full Topic →
                  </button>
                  {topic.questionsAnswers && topic.questionsAnswers.length > 0 && (
                    <button className="btn-questions" onClick={handleShowQuestions}>
                      View Q&A ({topic.questionsAnswers.length})
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="qa-section">
                <button
                  className="btn-back"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQA(false);
                    setSelectedQA(null);
                  }}
                >
                  ← Back
                </button>
                <h4 className="qa-title">Questions & Answers</h4>
                <div className="qa-list">
                  {topic.questionsAnswers
                    .sort((a, b) => a.order - b.order)
                    .map((qa, index) => (
                      <div
                        key={index}
                        className={`qa-item ${selectedQA?.question === qa.question ? 'active' : ''}`}
                        onClick={(e) => handleQuestionClick(qa, e)}
                      >
                        <div className="qa-question">
                          <span className="qa-number">{index + 1}.</span>
                          {qa.question}
                        </div>
                        <AnimatePresence>
                          {selectedQA?.question === qa.question && (
                            <motion.div
                              className="qa-answer"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {qa.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopicCard;
