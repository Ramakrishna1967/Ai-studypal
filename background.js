// AI StudyPal - Background Service Worker
// Handles extension lifecycle and communication between components

class AIStudyPalBackground {
    constructor() {
        this.init();
    }

    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize storage
        this.initializeStorage();
    }

    setupEventListeners() {
        // Extension installation/update
        chrome.runtime.onInstalled.addListener((details) => {
            this.handleInstallation(details);
        });

        // Tab updates
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            this.handleTabUpdate(tabId, changeInfo, tab);
        });

        // Messages from content scripts and popup
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            this.handleMessage(request, sender, sendResponse);
            return true; // Keep message channel open for async responses
        });

        // Context menu (optional feature)
        chrome.contextMenus.onClicked.addListener((info, tab) => {
            this.handleContextMenuClick(info, tab);
        });
    }

    handleInstallation(details) {
        if (details.reason === 'install') {
            console.log('AI StudyPal installed successfully');
            
            // Set default settings
            chrome.storage.sync.set({
                settings: {
                    defaultSummaryFormat: 'bullet_points',
                    defaultSummaryLength: 'medium',
                    defaultQuizType: 'multiple_choice',
                    defaultQuizDifficulty: 'medium',
                    defaultQuizCount: 5,
                    defaultSourceLanguage: 'auto',
                    defaultTargetLanguage: 'en',
                    defaultToolAction: 'proofread'
                }
            });

            // Create context menu
            this.createContextMenu();
        } else if (details.reason === 'update') {
            console.log('AI StudyPal updated to version', chrome.runtime.getManifest().version);
        }
    }

    createContextMenu() {
        chrome.contextMenus.create({
            id: 'ai-studypal-summarize',
            title: 'Summarize with AI StudyPal',
            contexts: ['selection', 'page']
        });

        chrome.contextMenus.create({
            id: 'ai-studypal-quiz',
            title: 'Generate Quiz with AI StudyPal',
            contexts: ['selection', 'page']
        });

        chrome.contextMenus.create({
            id: 'ai-studypal-translate',
            title: 'Translate with AI StudyPal',
            contexts: ['selection', 'page']
        });
    }

    handleTabUpdate(tabId, changeInfo, tab) {
        // Only process when page is completely loaded
        if (changeInfo.status === 'complete' && tab.url) {
            // Check if this is a supported page
            if (this.isSupportedPage(tab.url)) {
                // Inject content script if needed
                this.ensureContentScript(tabId);
            }
        }
    }

    isSupportedPage(url) {
        // Check if the URL is supported (not chrome://, chrome-extension://, etc.)
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch (error) {
            return false;
        }
    }

    async ensureContentScript(tabId) {
        try {
            // Check if content script is already injected
            const results = await chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: () => {
                    return typeof window.AIStudyPalContentScript !== 'undefined';
                }
            });

            if (!results[0].result) {
                // Inject content script
                await chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['content.js']
                });
            }
        } catch (error) {
            console.log('Could not inject content script:', error.message);
        }
    }

    async handleMessage(request, sender, sendResponse) {
        try {
            switch (request.action) {
                case 'getPageContent':
                    const content = await this.getPageContent(sender.tab.id);
                    sendResponse({ success: true, data: content });
                    break;

                case 'saveSettings':
                    await this.saveSettings(request.settings);
                    sendResponse({ success: true });
                    break;

                case 'getSettings':
                    const settings = await this.getSettings();
                    sendResponse({ success: true, data: settings });
                    break;

                case 'checkAIAPIAvailability':
                    const available = await this.checkAIAPIAvailability();
                    sendResponse({ success: true, available: available });
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown action' });
            }
        } catch (error) {
            sendResponse({ success: false, error: error.message });
        }
    }

    async getPageContent(tabId) {
        try {
            const results = await chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: () => {
                    // Extract content using the same logic as content script
                    const extractor = new ContentExtractor();
                    return extractor.extractPageContent();
                }
            });

            return results[0].result;
        } catch (error) {
            throw new Error('Failed to extract page content: ' + error.message);
        }
    }

    async saveSettings(settings) {
        try {
            await chrome.storage.sync.set({ settings: settings });
        } catch (error) {
            throw new Error('Failed to save settings: ' + error.message);
        }
    }

    async getSettings() {
        try {
            const result = await chrome.storage.sync.get(['settings']);
            return result.settings || {};
        } catch (error) {
            throw new Error('Failed to get settings: ' + error.message);
        }
    }

    async checkAIAPIAvailability() {
        try {
            // Check if Chrome AI APIs are available
            return typeof chrome.ai !== 'undefined' && 
                   chrome.ai.summarizer && 
                   chrome.ai.translator && 
                   chrome.ai.writer && 
                   chrome.ai.proofreader && 
                   chrome.ai.rewriter;
        } catch (error) {
            return false;
        }
    }

    handleContextMenuClick(info, tab) {
        switch (info.menuItemId) {
            case 'ai-studypal-summarize':
                this.openPopupWithTab('summary', tab.id);
                break;
            case 'ai-studypal-quiz':
                this.openPopupWithTab('quiz', tab.id);
                break;
            case 'ai-studypal-translate':
                this.openPopupWithTab('translate', tab.id);
                break;
        }
    }

    openPopupWithTab(tabName, tabId) {
        // Open popup and switch to specific tab
        chrome.action.openPopup();
        
        // Send message to popup to switch tab
        setTimeout(() => {
            chrome.runtime.sendMessage({
                action: 'switchTab',
                tabName: tabName
            });
        }, 100);
    }

    // Utility methods
    async getActiveTab() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return tab;
    }

    async isChromeAIEnabled() {
        try {
            // Try to access Chrome AI APIs
            const testResult = await chrome.ai.summarizer.create({
                text: 'test',
                format: 'bullet_points',
                length: 'short'
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}

// Initialize background service worker
const aiStudyPalBackground = new AIStudyPalBackground();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIStudyPalBackground;
}


