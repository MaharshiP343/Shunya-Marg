const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Topic = require('../models/Topic');
const connectDB = require('../config/database');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const topics = [
  {
    title: "Glimpses of TattvaBodh",
    icon: "🕉️",
    preview: "Explore the essence of self-knowledge and reality",
    description: "TattvaBodh reveals the fundamental truths about the nature of reality, the self, and consciousness. Discover the path to self-realization through ancient Vedantic wisdom.",
    slug: "tattvabodh",
    questionsAnswers: [
      { question: "What is TattvaBodh?", answer: "TattvaBodh is a foundational text of Vedanta that explains the fundamental principles of reality and self-knowledge.", order: 1 },
      { question: "Who wrote TattvaBodh?", answer: "TattvaBodh is traditionally attributed to Adi Shankaracharya, the great philosopher and reformer of Advaita Vedanta.", order: 2 },
      { question: "What are the main topics covered?", answer: "It covers the nature of Brahman, Atman, the five sheaths, the three bodies, and the means of knowledge.", order: 3 },
      { question: "How does it help spiritual seekers?", answer: "It provides a systematic framework for understanding the self and preparing the mind for higher spiritual practices.", order: 4 }
    ],
    order: 1
  },
  {
    title: "Understanding Hindu Scriptures",
    icon: "📚",
    preview: "Journey through the sacred texts of Hinduism",
    description: "Dive into the profound wisdom of Vedas, Upanishads, and other sacred texts. Learn their historical context, philosophical depth, and practical applications.",
    slug: "hindu-scriptures",
    questionsAnswers: [
      { question: "What are the Vedas?", answer: "The Vedas are the oldest sacred texts of Hinduism, consisting of four collections: Rigveda, Yajurveda, Samaveda, and Atharvaveda.", order: 1 },
      { question: "What are the Upanishads?", answer: "The Upanishads are philosophical texts that form the foundation of Vedantic thought, exploring the nature of reality and consciousness.", order: 2 },
      { question: "What is the Bhagavad Gita?", answer: "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata, containing a dialogue between Krishna and Arjuna.", order: 3 }
    ],
    order: 2
  },
  {
    title: "Patanjali Yoga Sutra",
    icon: "🧘",
    preview: "Master the eight limbs of classical yoga",
    description: "Study the systematic approach to yoga philosophy and practice. Understand the path to mental clarity, spiritual growth, and ultimate liberation through Patanjali's sutras.",
    slug: "yoga-sutra",
    questionsAnswers: [
      { question: "What are the eight limbs of yoga?", answer: "Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, and Samadhi - forming a complete path to spiritual realization.", order: 1 },
      { question: "What is the goal of Yoga?", answer: "The goal is Chitta Vritti Nirodha - the cessation of the fluctuations of the mind, leading to the realization of one's true nature.", order: 2 },
      { question: "Who was Patanjali?", answer: "Patanjali was an ancient sage who systematized the practice of yoga in his Yoga Sutras around 400 CE.", order: 3 }
    ],
    order: 3
  },
  {
    title: "Bhagavad Gita",
    icon: "⚔️",
    preview: "The timeless dialogue on dharma and devotion",
    description: "Explore Krishna's teachings on duty, righteousness, and the paths to moksha. Discover practical wisdom for modern life through this eternal scripture.",
    slug: "bhagavad-gita",
    questionsAnswers: [
      { question: "What is the main teaching?", answer: "Perform your duty without attachment to results, dedicating all actions to the Divine.", order: 1 },
      { question: "What are the three paths mentioned?", answer: "Karma Yoga (path of action), Bhakti Yoga (path of devotion), and Jnana Yoga (path of knowledge).", order: 2 },
      { question: "Why is it relevant today?", answer: "It addresses universal human dilemmas about duty, morality, and the meaning of life, making it timeless.", order: 3 }
    ],
    order: 4
  },
  {
    title: "Meditation Practices",
    icon: "🧘‍♀️",
    preview: "Ancient techniques for modern minds",
    description: "Learn various meditation techniques from different traditions. Develop inner peace, clarity, and spiritual awareness through regular practice.",
    slug: "meditation",
    questionsAnswers: [
      { question: "What is meditation?", answer: "Meditation is the practice of training attention and awareness to achieve mental clarity and emotional calmness.", order: 1 },
      { question: "What are the benefits?", answer: "Reduced stress, improved focus, emotional balance, better sleep, and spiritual growth.", order: 2 },
      { question: "How to start?", answer: "Begin with 5-10 minutes daily, focusing on breath. Gradually increase duration as your practice deepens.", order: 3 }
    ],
    order: 5
  },
  {
    title: "Advait Vedanta",
    icon: "🔱",
    preview: "The non-dual philosophy of oneness",
    description: "Explore the profound teaching of non-duality. Understand the unity of individual consciousness with universal consciousness beyond all distinctions.",
    slug: "advait-vedant",
    questionsAnswers: [
      { question: "What does Advaita mean?", answer: "Advaita means 'non-dual' - the teaching that ultimate reality is one, without a second.", order: 1 },
      { question: "What is Maya?", answer: "Maya is the illusory power that makes the one reality appear as the diverse world of names and forms.", order: 2 },
      { question: "How to realize this truth?", answer: "Through self-inquiry, discrimination, and meditation, one can realize the non-dual nature of existence.", order: 3 }
    ],
    order: 6
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Topic.deleteMany();

    console.log('🗑️  Cleared existing data');

    // Create default admin user
    const adminUser = await User.create({
      name: process.env.ADMIN_NAME || 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@shunyamarg.org',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });

    console.log('✅ Created default admin user');
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);

    // Create topics
    const createdTopics = await Topic.insertMany(
      topics.map(topic => ({ ...topic, createdBy: adminUser._id }))
    );

    console.log(`✅ Created ${createdTopics.length} topics`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Admin Login Credentials:');
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
