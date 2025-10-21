{
  "name": "ai-studypal",
  "version": "1.0.0",
  "description": "Transform any webpage into interactive learning experiences using Chrome's Built-in AI",
  "main": "popup.js",
  "scripts": {
    "build": "echo 'No build process needed for vanilla JS extension'",
    "test": "echo 'No tests specified yet'",
    "lint": "echo 'No linter configured yet'",
    "package": "zip -r ai-studypal.zip . -x '*.git*' 'node_modules/*' '*.md' 'test-page.html' 'package.json' 'package-lock.json'"
  },
  "keywords": [
    "chrome-extension",
    "ai",
    "education",
    "learning",
    "chrome-ai-apis",
    "summarization",
    "quiz",
    "translation",
    "writing-tools"
  ],
  "author": "AI StudyPal Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/ai-studypal.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/ai-studypal/issues"
  },
  "homepage": "https://github.com/yourusername/ai-studypal#readme",
  "engines": {
    "node": ">=14.0.0"
  },
  "devDependencies": {},
  "dependencies": {}
}
