# 🎓 AI StudyPal - Smart Learning Companion

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow.svg)](https://chrome.google.com/webstore)
[![Built with Chrome AI APIs](https://img.shields.io/badge/Built%20with-Chrome%20AI%20APIs-blue.svg)](https://developer.chrome.com/docs/ai/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Transform any webpage into an interactive learning experience using Chrome's built-in AI

## 🚀 Overview

AI StudyPal is a powerful Chrome extension that leverages Chrome's Built-in AI APIs to help students, researchers, and lifelong learners efficiently process and understand online content. With one click, turn complex articles, research papers, and documentation into summarized notes, interactive quizzes, and multilingual learning materials.

## ✨ Features

### 🧠 Smart Summarization
- **One-click summaries** of any webpage
- **Multiple formats**: Bullet points, paragraphs, outlines
- **Adjustable length**: Short, medium, long summaries
- **Key concepts extraction** from complex content

### 🎯 Interactive Quiz Generation
- **Multiple choice questions** from page content
- **True/False questions** for quick knowledge checks
- **Flashcard generation** for memorization
- **Difficulty levels** (Easy, Medium, Hard)
- **Automatic answer explanations**

### 🌍 Multilingual Translation
- **Real-time page translation** with academic tone preservation
- **Support for 10+ languages** (English, Spanish, French, German, Chinese, Japanese, Korean, Hindi, and more)
- **Context-aware translations** that maintain educational integrity

### ✏️ Writing Excellence Tools
- **Grammar correction** tuned for academic writing
- **Content simplification** for complex topics
- **Text expansion** for detailed explanations
- **Formalization** of casual content
- **Citation-ready text generation**

## 🛠 Technologies Used

- **Chrome Extension Manifest V3**
- **Chrome Built-in AI APIs:**
  - `chrome.ai.summarizer` - Content summarization
  - `chrome.ai.translator` - Multilingual translation
  - `chrome.ai.writer` - Quiz and content generation
  - `chrome.ai.proofreader` - Grammar correction
  - `chrome.ai.rewriter` - Content transformation
- **Vanilla JavaScript** (No frameworks for optimal performance)
- **Chrome Storage API** for user preferences
- **Modern CSS** with responsive design

## 📦 Installation

### Prerequisites
- Google Chrome version 120 or later
- Chrome Built-in AI features enabled
- Chrome Extension developer mode

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ai-studypal.git
   cd ai-studypal
   ```

2. **Enable Chrome Built-in AI:**
   - Navigate to `chrome://flags/`
   - Search for "Built-in AI"
   - Enable the experimental AI features
   - Restart Chrome

3. **Load the extension:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `ai-studypal` directory
   - The extension icon should appear in your toolbar

## 🎮 Usage

### Quick Start
1. **Navigate to any educational webpage** (article, documentation, research paper)
2. **Click the AI StudyPal icon** in your Chrome toolbar
3. **Choose your learning tool:**
   - 📝 **Summarize** - Get instant summaries
   - ❓ **Quiz** - Generate interactive questions
   - 🌍 **Translate** - Convert to your preferred language
   - ✏️ **Tools** - Improve and transform text

### Feature Details

#### Smart Summarization
- Click "Summarize Page" for instant bullet-point summary
- Customize format and length in the Summary tab
- Export summaries for your notes

#### Quiz Generation
- Select question type (Multiple Choice, True/False, Flashcards)
- Choose difficulty level and number of questions
- Test your knowledge with instant feedback

#### Translation
- Select source and target languages
- Get academically-appropriate translations
- Perfect for international research

#### Writing Tools
- Paste text into the input area
- Choose from Proofread, Simplify, Expand, or Formalize
- Get improved text with explanations

## 🔧 API Integration

### Summarizer API
```javascript
const summary = await chrome.ai.summarizer.create({
  text: pageContent,
  format: 'bullet_points',
  length: 'medium',
  focus: 'key_concepts'
});
```

### Translator API
```javascript
const translation = await chrome.ai.translator.translate({
  text: content,
  targetLanguage: 'es',
  sourceLanguage: 'auto',
  format: 'text'
});
```

### Writer API
```javascript
const quiz = await chrome.ai.writer.write({
  prompt: `Generate 5 multiple choice questions from: ${content}`,
  format: 'json',
  temperature: 0.7
});
```

## 🏗 Project Structure

```
ai-studypal/
├── manifest.json              # Extension configuration
├── src/
│   ├── content/               # Content scripts
│   │   ├── summarizer.js      # Summarization logic
│   │   ├── translator.js      # Translation services
│   │   ├── quiz-generator.js  # Quiz generation
│   │   ├── proofreader.js     # Grammar correction
│   │   └── rewriter.js        # Content transformation
│   ├── popup/                 # Extension popup UI
│   │   ├── popup.html         # Popup structure
│   │   ├── popup.js           # Popup functionality
│   │   └── popup.css          # Popup styling
│   └── background/            # Background processes
│       └── service-worker.js  # Service worker
├── assets/                    # Icons and images
│   └── icons/
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
├── utils/                     # Utility functions
│   ├── storage.js            # Chrome storage helpers
│   └── helpers.js            # Common utilities
├── docs/                      # Documentation
├── README.md                  # This file
└── LICENSE                    # MIT License
```

## 🚀 Development

### Building from Source

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Load in Chrome:**
   - Follow the installation steps above
   - The built extension will be in the `dist/` folder

### Testing
```bash
npm test
```

## 📈 Performance

- **Zero latency** for AI processing (runs locally)
- **Offline capability** for all core features
- **Privacy-first** - no data leaves your device
- **Lightweight** - minimal impact on browser performance

## 🔒 Privacy & Security

- **100% Local Processing**: All AI computations happen on your device
- **No Data Collection**: We don't store or transmit your content
- **Transparent Code**: Fully open-source for community verification
- **Secure Permissions**: Minimal required permissions for functionality



1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request






