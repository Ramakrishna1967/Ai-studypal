// AI StudyPal - Content Script
// This script runs on all web pages to extract content for AI processing

class ContentExtractor {
    constructor() {
        this.init();
    }

    init() {
        // Listen for messages from popup
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'extractContent') {
                this.extractPageContent().then(sendResponse);
                return true; // Keep message channel open for async response
            }
        });
    }

    async extractPageContent() {
        try {
            // Extract main content from the page
            const content = this.getMainContent();
            const metadata = this.getPageMetadata();
            
            return {
                success: true,
                content: content,
                metadata: metadata,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    getMainContent() {
        // Try to find the main content area
        const mainSelectors = [
            'main',
            'article',
            '[role="main"]',
            '.content',
            '.main-content',
            '.post-content',
            '.entry-content',
            '#content',
            '#main'
        ];

        let mainElement = null;
        for (const selector of mainSelectors) {
            mainElement = document.querySelector(selector);
            if (mainElement) break;
        }

        // If no main element found, use body
        if (!mainElement) {
            mainElement = document.body;
        }

        // Clean up the content
        const content = this.cleanText(mainElement.innerText || mainElement.textContent || '');
        
        // Limit content size to prevent API limits
        return content.substring(0, 15000);
    }

    getPageMetadata() {
        return {
            title: document.title || '',
            url: window.location.href,
            domain: window.location.hostname,
            language: document.documentElement.lang || 'en',
            wordCount: this.getWordCount(),
            readingTime: this.estimateReadingTime()
        };
    }

    cleanText(text) {
        // Remove extra whitespace and normalize
        return text
            .replace(/\s+/g, ' ')
            .replace(/\n\s*\n/g, '\n')
            .trim();
    }

    getWordCount() {
        const text = document.body.innerText || document.body.textContent || '';
        return text.split(/\s+/).filter(word => word.length > 0).length;
    }

    estimateReadingTime() {
        const wordCount = this.getWordCount();
        const wordsPerMinute = 200; // Average reading speed
        return Math.ceil(wordCount / wordsPerMinute);
    }

    // Utility method to extract specific content types
    extractByType(type) {
        switch (type) {
            case 'headings':
                return this.extractHeadings();
            case 'paragraphs':
                return this.extractParagraphs();
            case 'lists':
                return this.extractLists();
            case 'links':
                return this.extractLinks();
            default:
                return this.getMainContent();
        }
    }

    extractHeadings() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        return Array.from(headings).map(h => ({
            level: parseInt(h.tagName.charAt(1)),
            text: h.innerText.trim()
        }));
    }

    extractParagraphs() {
        const paragraphs = document.querySelectorAll('p');
        return Array.from(paragraphs)
            .map(p => p.innerText.trim())
            .filter(text => text.length > 50); // Filter out very short paragraphs
    }

    extractLists() {
        const lists = document.querySelectorAll('ul, ol');
        return Array.from(lists).map(list => ({
            type: list.tagName.toLowerCase(),
            items: Array.from(list.querySelectorAll('li')).map(li => li.innerText.trim())
        }));
    }

    extractLinks() {
        const links = document.querySelectorAll('a[href]');
        return Array.from(links).map(link => ({
            text: link.innerText.trim(),
            href: link.href,
            title: link.title || ''
        })).filter(link => link.text.length > 0);
    }
}

// Initialize content extractor
const contentExtractor = new ContentExtractor();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentExtractor;
}
