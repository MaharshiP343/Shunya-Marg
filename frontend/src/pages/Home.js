import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import TopicCard from '../components/Cards/TopicCard';
import './Home.css';

function Home() {
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get('/api/topics');
      setTopics(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching topics:', error);
      toast.error('Failed to load topics');
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    try {
      const response = await axios.get(`/api/topics?search=${value}`);
      setTopics(response.data.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleTopicClick = (topic) => {
    navigate(`/topic/${topic._id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading topics...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">ShunyaMarg</h1>
          <p className="hero-subtitle">The path towards the Zero Milestone</p>
          <p className="hero-description">
            A journey towards freedom from the noise of thoughts, the weight of possessions,
            and the burden of unnecessary words. Discover pure stillness and clarity.
          </p>
        </div>
      </div>

      <div className="topics-container">
        <div className="search-section">
          <input
            type="text"
            placeholder="🔍 Search topics..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <h2 className="section-title">Explore Our Topics</h2>
        
        {topics.length === 0 ? (
          <div className="no-results">
            <p>No topics found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="cards-grid">
            {topics.map((topic) => (
              <TopicCard
                key={topic._id}
                topic={topic}
                onClick={handleTopicClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
