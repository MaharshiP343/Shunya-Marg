import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TopicCard.css';

const TopicCard = ({ topic, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedQA, setSelectedQA] = useState(null);

  // When card is clicked, flip it
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setSelectedQA(null); // Reset selected Q&A when flipping back
    }
  };

  // When a question is clicked, toggle answer display
  const handleQuestionClick = (qa, e) => {
    e.stopPropagation();
    // Toggle: if already selected, deselect; otherwise select
    setSelectedQA(selectedQA?.question === qa.question ? null : qa);
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
          {/* ===== FRONT SIDE ===== */}
          <div className="card-face card-front">
            <div className="card-icon">{topic.icon}</div>
            <h3 className="card-title">{topic.title}</h3>
            <p className="card-preview">{topic.preview}</p>
            <p className="card-hint">Click to reveal questions →</p>
          </div>

          {/* ===== BACK SIDE (QUESTIONS LIST) ===== */}
          <div className="card-face card-back">
            <div className="qa-section">
              <h3 className="qa-header">Questions & Answers</h3>
              
              {topic.questionsAnswers && topic.questionsAnswers.length > 0 ? (
                <div className="qa-list">
                  {topic.questionsAnswers
                    .sort((a, b) => a.order - b.order)
                    .map((qa, index) => (
                      <div
                        key={index}
                        className={`qa-item ${selectedQA?.question === qa.question ? 'active' : ''}`}
                        onClick={(e) => handleQuestionClick(qa, e)}
                      >
                        {/* Question Header */}
                        <div className="qa-question">
                          <span className="qa-number">{index + 1}.</span>
                          <span className="qa-question-text">{qa.question}</span>
                          <span className="qa-toggle">
                            {selectedQA?.question === qa.question ? '▼' : '▶'}
                          </span>
                        </div>

                        {/* Answer (Animated Reveal) */}
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
              ) : (
                <p className="no-questions">No questions available for this topic yet.</p>
              )}

              <p className="card-flip-hint">← Click card to flip back</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopicCard;
