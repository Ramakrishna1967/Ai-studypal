{
  "manifest_version": 3,
  "name": "AI StudyPal - Smart Learning Companion",
  "version": "1.0.0",
  "description": "Transform any webpage into interactive learning experiences using Chrome's Built-in AI",
  
  "permissions": [
    "activeTab",
    "storage",
    "scripting",
    "aiLanguageModel",
    "aiLanguageModelPrivate"
  ],
  
  "host_permissions": ["<all_urls>"],
  
  "action": {
    "default_popup": "popup.html",
    "default_title": "AI StudyPal",
    "default_icon": {
      "16": "assets/icons/icon16.png",
      "48": "assets/icons/icon48.png",
      "128": "assets/icons/icon128.png"
    }
  },
  
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }],
  
  "background": {
    "service_worker": "background.js"
  },
  
  "icons": {
    "16": "assets/icons/icon16.png",
    "48": "assets/icons/icon48.png",
    "128": "assets/icons/icon128.png"
  }
}
