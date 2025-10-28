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
      { 
        question: "What is TattvaBodh?", 
        answer: "TattvaBodh is a foundational text of Vedanta that explains the fundamental principles of reality and self-knowledge. It serves as a primer for those beginning their spiritual journey.", 
        order: 1 
      },
      { 
        question: "Who wrote TattvaBodh?", 
        answer: "TattvaBodh is traditionally attributed to Adi Shankaracharya, the great 8th-century philosopher and reformer of Advaita Vedanta who established the doctrine of non-dualism.", 
        order: 2 
      },
      { 
        question: "What are the main topics covered?", 
        answer: "It covers the nature of Brahman (ultimate reality), Atman (the self), the five sheaths (Pancha Koshas), the three bodies, and the valid means of knowledge for spiritual realization.", 
        order: 3 
      },
      { 
        question: "How does it help spiritual seekers?", 
        answer: "It provides a systematic framework for understanding the self and preparing the mind for higher spiritual practices. It clarifies fundamental concepts essential for Vedantic study.", 
        order: 4 
      },
      { 
        question: "What are the qualifications needed to study it?", 
        answer: "The text describes four qualifications: discrimination (Viveka), dispassion (Vairagya), six virtues (Shatsampatti), and desire for liberation (Mumukshutva).", 
        order: 5 
      }
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
      { 
        question: "What are the Vedas?", 
        answer: "The Vedas are the oldest sacred texts of Hinduism, consisting of four collections: Rigveda (hymns), Yajurveda (rituals), Samaveda (melodies), and Atharvaveda (spells and charms). They form the foundation of Hindu philosophy.", 
        order: 1 
      },
      { 
        question: "What are the Upanishads?", 
        answer: "The Upanishads are philosophical texts that form the concluding portions of the Vedas. They explore the nature of reality, consciousness, and the relationship between Atman (individual soul) and Brahman (universal consciousness).", 
        order: 2 
      },
      { 
        question: "What is the Bhagavad Gita?", 
        answer: "The Bhagavad Gita is a 700-verse scripture that is part of the epic Mahabharata. It contains a dialogue between Krishna and Arjuna on the battlefield, covering dharma, karma, devotion, and liberation.", 
        order: 3 
      },
      { 
        question: "How many Upanishads are there?", 
        answer: "While there are over 200 Upanishads, traditionally 108 are considered canonical. Of these, 10-13 are called the Principal or Mukhya Upanishads and are most widely studied.", 
        order: 4 
      },
      { 
        question: "What are Puranas?", 
        answer: "Puranas are ancient texts that contain mythological stories, genealogies of gods and sages, and teachings on dharma. The 18 major Puranas cover creation, dissolution, and cyclical nature of the universe.", 
        order: 5 
      }
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
      { 
        question: "What are the eight limbs of yoga?", 
        answer: "The eight limbs are: Yama (ethical restraints), Niyama (personal observances), Asana (postures), Pranayama (breath control), Pratyahara (withdrawal of senses), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption) - forming a complete path to spiritual realization.", 
        order: 1 
      },
      { 
        question: "What is the goal of Yoga according to Patanjali?", 
        answer: "The goal is Chitta Vritti Nirodha - the cessation of the fluctuations of the mind. When the mind becomes still, one realizes their true nature as pure consciousness, distinct from thoughts and emotions.", 
        order: 2 
      },
      { 
        question: "Who was Patanjali?", 
        answer: "Patanjali was an ancient sage who systematized the practice of yoga in his Yoga Sutras around 400 CE. He compiled and organized existing yogic practices into 196 sutras divided into four chapters.", 
        order: 3 
      },
      { 
        question: "What are the five Yamas?", 
        answer: "The five Yamas are Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (celibacy/moderation), and Aparigraha (non-possessiveness). These are universal ethical principles.", 
        order: 4 
      },
      { 
        question: "What is Samadhi?", 
        answer: "Samadhi is the eighth and final limb, representing the state of complete absorption where the meditator becomes one with the object of meditation. It is the ultimate goal where duality dissolves.", 
        order: 5 
      }
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
      { 
        question: "What is the main teaching of the Gita?", 
        answer: "Perform your duty (dharma) without attachment to results, dedicating all actions to the Divine. Act with full dedication but remain detached from outcomes, maintaining equanimity in success and failure.", 
        order: 1 
      },
      { 
        question: "What are the three paths to liberation?", 
        answer: "Karma Yoga (path of selfless action), Bhakti Yoga (path of devotion and love for God), and Jnana Yoga (path of knowledge and wisdom). All three paths lead to the same goal of liberation.", 
        order: 2 
      },
      { 
        question: "Why is it relevant today?", 
        answer: "It addresses universal human dilemmas about duty, morality, purpose, and the meaning of life. Its teachings on managing stress, making ethical choices, and finding inner peace are timeless and applicable to modern challenges.", 
        order: 3 
      },
      { 
        question: "What is Arjuna's dilemma?", 
        answer: "Arjuna faces a moral crisis on the battlefield, torn between his duty as a warrior and his love for his relatives on the opposing side. His confusion represents the universal human struggle with duty and emotion.", 
        order: 4 
      },
      { 
        question: "What does Krishna teach about the soul?", 
        answer: "Krishna teaches that the soul (Atman) is eternal, indestructible, and unchanging. It cannot be cut, burned, wetted, or dried. Only the body dies; the soul transmigrates to another body.", 
        order: 5 
      }
    ],
    order: 4
  },
  {
    title: "Ashtavakra Gita",
    icon: "🌟",
    preview: "Direct teachings on non-dual self-realization",
    description: "Experience the profound dialogue between sage Ashtavakra and King Janaka. Discover the direct path to liberation through recognition of your true nature.",
    slug: "ashtavakra-gita",
    questionsAnswers: [
      { 
        question: "What makes Ashtavakra Gita unique?", 
        answer: "It presents the most direct and uncompromising teachings on Advaita (non-duality). Unlike gradual paths, it points immediately to the truth that you are already the infinite, limitless consciousness.", 
        order: 1 
      },
      { 
        question: "Who was Ashtavakra?", 
        answer: "Ashtavakra was a sage born with eight physical deformities, yet possessed supreme wisdom. His name means 'eight bends' but his teachings show no bend or compromise in presenting the absolute truth.", 
        order: 2 
      },
      { 
        question: "What is the main teaching?", 
        answer: "You are not the body, not the mind, not the doer. You are the pure, witnessing consciousness - ever free, unchanging, and complete. Liberation is not something to be achieved but recognized as your true nature.", 
        order: 3 
      },
      { 
        question: "How does it differ from Bhagavad Gita?", 
        answer: "While the Gita teaches gradual spiritual practice (yoga), Ashtavakra Gita teaches instant recognition. It's for mature seekers ready for direct knowledge, whereas Gita accommodates all levels of spiritual maturity.", 
        order: 4 
      },
      { 
        question: "What is meant by witness consciousness?", 
        answer: "You are the awareness that observes all thoughts, feelings, and experiences without being affected by them. Like a screen remains untouched by images projected on it, you remain pure awareness.", 
        order: 5 
      }
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
      { 
        question: "What does Advaita mean?", 
        answer: "Advaita means 'non-dual' or 'not two'. It is the teaching that ultimate reality (Brahman) is one without a second. The apparent multiplicity of the world is an illusion (Maya).", 
        order: 1 
      },
      { 
        question: "What is Maya?", 
        answer: "Maya is the illusory power that makes the one reality appear as the diverse world of names and forms. It's like a rope appearing as a snake in dim light - the rope alone is real, the snake is imagined.", 
        order: 2 
      },
      { 
        question: "How to realize this truth?", 
        answer: "Through self-inquiry (Atma Vichara), discrimination between real and unreal (Viveka), study of scriptures with a qualified teacher, and meditation. The key is recognizing 'I am Brahman' (Aham Brahmasmi).", 
        order: 3 
      },
      { 
        question: "Who is Adi Shankaracharya?", 
        answer: "Adi Shankaracharya (788-820 CE) was the greatest exponent of Advaita Vedanta. He wrote commentaries on Upanishads, Bhagavad Gita, and Brahma Sutras, and established four monasteries across India.", 
        order: 4 
      },
      { 
        question: "What is the relationship between Atman and Brahman?", 
        answer: "They are identical. Atman (individual consciousness) and Brahman (universal consciousness) are one and the same. The famous Mahavakya (great saying) 'Tat Tvam Asi' means 'That thou art'.", 
        order: 5 
      }
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

    console.log(`✅ Created ${createdTopics.length} topics with Q&A`);
    
    // Show Q&A count for each topic
    createdTopics.forEach(topic => {
      console.log(`   📚 ${topic.title}: ${topic.questionsAnswers.length} Q&A pairs`);
    });
    
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
