// AI StudyPal - Main Popup Script
class AIStudyPal {
    constructor() {
        this.currentTab = null;
        this.init();
    }

    async init() {
        // Get current active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        this.currentTab = tab;

        // Initialize event listeners
        this.initializeEventListeners();
        
        // Check Chrome AI API availability
        await this.checkAIAPIAvailability();
    }

    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Summary tab
        document.getElementById('generateSummary').addEventListener('click', () => {
            this.generateSummary();
        });

        // Quiz tab
        document.getElementById('generateQuiz').addEventListener('click', () => {
            this.generateQuiz();
        });

        // Translate tab
        document.getElementById('translatePage').addEventListener('click', () => {
            this.translatePage();
        });

        // Tools tab
        document.getElementById('processText').addEventListener('click', () => {
            this.processText();
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
    }

    async checkAIAPIAvailability() {
        try {
            // Check if Chrome AI APIs are available
            if (typeof chrome.ai === 'undefined') {
                this.showError('Chrome AI APIs not available. Please ensure you have the latest Chrome version with AI features enabled.');
                return false;
            }
            return true;
        } catch (error) {
            this.showError('Error checking AI API availability: ' + error.message);
            return false;
        }
    }

    showLoading(show = true) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }

    showError(message) {
        this.showLoading(false);
        const resultDiv = document.querySelector('.result-content');
        resultDiv.innerHTML = `<div class="error">${message}</div>`;
    }

    showSuccess(message) {
        this.showLoading(false);
        const resultDiv = document.querySelector('.result-content');
        resultDiv.innerHTML = `<div class="success">${message}</div>`;
    }

    async getPageContent() {
        try {
            // Inject content script to get page content
            const results = await chrome.scripting.executeScript({
                target: { tabId: this.currentTab.id },
                function: () => {
                    // Extract main content from page
                    const content = document.body.innerText || document.body.textContent || '';
                    const title = document.title || '';
                    const url = window.location.href;
                    
                    return {
                        title,
                        url,
                        content: content.substring(0, 10000) // Limit content size
                    };
                }
            });

            return results[0].result;
        } catch (error) {
            throw new Error('Failed to extract page content: ' + error.message);
        }
    }

    async generateSummary() {
        try {
            this.showLoading(true);
            
            const pageContent = await this.getPageContent();
            const format = document.getElementById('summaryFormat').value;
            const length = document.getElementById('summaryLength').value;

            // Use Chrome AI Summarizer API
            const summary = await chrome.ai.summarizer.create({
                text: pageContent.content,
                format: format,
                length: length,
                focus: 'key_concepts'
            });

            const resultDiv = document.getElementById('summaryResult');
            resultDiv.innerHTML = `
                <h4>📝 Summary of "${pageContent.title}"</h4>
                <div class="summary-content">${this.formatSummary(summary, format)}</div>
            `;

            this.showLoading(false);
        } catch (error) {
            this.showError('Failed to generate summary: ' + error.message);
        }
    }

    formatSummary(summary, format) {
        if (format === 'bullet_points') {
            return `<ul>${summary.split('\n').map(point => 
                point.trim() ? `<li>${point.trim()}</li>` : ''
            ).join('')}</ul>`;
        } else if (format === 'outline') {
            return `<div class="outline">${summary.replace(/\n/g, '<br>')}</div>`;
        } else {
            return `<p>${summary}</p>`;
        }
    }

    async generateQuiz() {
        try {
            this.showLoading(true);
            
            const pageContent = await this.getPageContent();
            const type = document.getElementById('quizType').value;
            const difficulty = document.getElementById('quizDifficulty').value;
            const count = parseInt(document.getElementById('quizCount').value);

            // Use Chrome AI Writer API to generate questions
            const prompt = `Generate ${count} ${difficulty} ${type} questions from the following content. Return as JSON with questions array containing question, options (for multiple choice), correct_answer, and explanation fields:

Content: ${pageContent.content.substring(0, 5000)}`;

            const response = await chrome.ai.writer.write({
                prompt: prompt,
                format: 'json',
                temperature: 0.7
            });

            const quizData = JSON.parse(response);
            this.displayQuiz(quizData.questions || []);

            this.showLoading(false);
        } catch (error) {
            this.showError('Failed to generate quiz: ' + error.message);
        }
    }

    displayQuiz(questions) {
        const resultDiv = document.getElementById('quizResult');
        
        if (questions.length === 0) {
            resultDiv.innerHTML = '<div class="error">No questions could be generated from this content.</div>';
            return;
        }

        let html = '<h4>🧠 Interactive Quiz</h4>';
        
        questions.forEach((q, index) => {
            html += `
                <div class="quiz-question" data-question="${index}">
                    <h4>Question ${index + 1}: ${q.question}</h4>
                    <ul class="quiz-options">
            `;
            
            if (q.options && q.options.length > 0) {
                q.options.forEach((option, optIndex) => {
                    html += `<li data-option="${optIndex}" onclick="studyPal.selectAnswer(${index}, ${optIndex})">${option}</li>`;
                });
            } else {
                html += `<li onclick="studyPal.selectAnswer(${index}, 'true')">True</li>`;
                html += `<li onclick="studyPal.selectAnswer(${index}, 'false')">False</li>`;
            }
            
            html += `
                    </ul>
                    <div class="quiz-explanation" style="display: none;">
                        <strong>Answer:</strong> ${q.correct_answer}<br>
                        <strong>Explanation:</strong> ${q.explanation || 'No explanation provided.'}
                    </div>
                </div>
            `;
        });

        resultDiv.innerHTML = html;
    }

    selectAnswer(questionIndex, optionIndex) {
        const questionDiv = document.querySelector(`[data-question="${questionIndex}"]`);
        const options = questionDiv.querySelectorAll('.quiz-options li');
        const explanation = questionDiv.querySelector('.quiz-explanation');
        
        // Remove previous selections
        options.forEach(opt => {
            opt.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Mark selected option
        const selectedOption = options[optionIndex];
        selectedOption.classList.add('selected');
        
        // Show explanation
        explanation.style.display = 'block';
    }

    async translatePage() {
        try {
            this.showLoading(true);
            
            const pageContent = await this.getPageContent();
            const sourceLang = document.getElementById('sourceLanguage').value;
            const targetLang = document.getElementById('targetLanguage').value;

            if (sourceLang === targetLang) {
                this.showError('Source and target languages must be different.');
                return;
            }

            // Use Chrome AI Translator API
            const translation = await chrome.ai.translator.translate({
                text: pageContent.content,
                targetLanguage: targetLang,
                sourceLanguage: sourceLang === 'auto' ? undefined : sourceLang,
                format: 'text'
            });

            const resultDiv = document.getElementById('translateResult');
            resultDiv.innerHTML = `
                <h4>🌐 Translation of "${pageContent.title}"</h4>
                <div class="translation-content">
                    <p><strong>Original Language:</strong> ${sourceLang === 'auto' ? 'Auto-detected' : sourceLang}</p>
                    <p><strong>Target Language:</strong> ${targetLang}</p>
                    <div class="translated-text">${translation}</div>
                </div>
            `;

            this.showLoading(false);
        } catch (error) {
            this.showError('Failed to translate page: ' + error.message);
        }
    }

    async processText() {
        try {
            this.showLoading(true);
            
            const inputText = document.getElementById('toolInput').value.trim();
            const action = document.getElementById('toolAction').value;

            if (!inputText) {
                this.showError('Please enter some text to process.');
                return;
            }

            let result;
            
            switch (action) {
                case 'proofread':
                    result = await chrome.ai.proofreader.correct({
                        text: inputText,
                        style: 'academic',
                        level: 'comprehensive'
                    });
                    break;
                    
                case 'simplify':
                    result = await chrome.ai.rewriter.rewrite({
                        text: inputText,
                        style: 'simplify',
                        tone: 'neutral'
                    });
                    break;
                    
                case 'expand':
                    result = await chrome.ai.rewriter.rewrite({
                        text: inputText,
                        style: 'expand',
                        tone: 'academic'
                    });
                    break;
                    
                case 'formalize':
                    result = await chrome.ai.rewriter.rewrite({
                        text: inputText,
                        style: 'formal',
                        tone: 'academic'
                    });
                    break;
                    
                default:
                    throw new Error('Invalid action selected');
            }

            const resultDiv = document.getElementById('toolResult');
            resultDiv.innerHTML = `
                <h4>🛠️ ${this.getActionTitle(action)}</h4>
                <div class="original-text">
                    <strong>Original:</strong><br>
                    <div class="text-content">${inputText}</div>
                </div>
                <div class="processed-text">
                    <strong>Processed:</strong><br>
                    <div class="text-content">${result}</div>
                </div>
            `;

            this.showLoading(false);
        } catch (error) {
            this.showError('Failed to process text: ' + error.message);
        }
    }

    getActionTitle(action) {
        const titles = {
            'proofread': 'Proofread & Corrected',
            'simplify': 'Simplified Text',
            'expand': 'Expanded Text',
            'formalize': 'Academic Style'
        };
        return titles[action] || 'Processed Text';
    }
}

// Initialize the extension when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.studyPal = new AIStudyPal();
});

// Make selectAnswer globally available for quiz functionality
window.selectAnswer = (questionIndex, optionIndex) => {
    if (window.studyPal) {
        window.studyPal.selectAnswer(questionIndex, optionIndex);
    }
};
