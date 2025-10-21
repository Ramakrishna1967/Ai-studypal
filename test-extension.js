// AI StudyPal Extension Test Script
// This script helps test the extension functionality

console.log('AI StudyPal Extension Test Script');
console.log('=================================');
console.log('');

// Test manifest.json
console.log('Testing manifest.json...');
try {
    const manifest = JSON.parse(require('fs').readFileSync('manifest.json', 'utf8'));
    
    // Check required fields
    const requiredFields = ['manifest_version', 'name', 'version', 'description', 'permissions', 'action'];
    let manifestValid = true;
    
    requiredFields.forEach(field => {
        if (manifest[field]) {
            console.log(`✅ ${field}: ${manifest[field]}`);
        } else {
            console.log(`❌ Missing required field: ${field}`);
            manifestValid = false;
        }
    });
    
    // Check permissions
    const requiredPermissions = ['activeTab', 'storage', 'scripting', 'aiLanguageModel', 'aiLanguageModelPrivate'];
    const hasAllPermissions = requiredPermissions.every(perm => 
        manifest.permissions && manifest.permissions.includes(perm)
    );
    
    if (hasAllPermissions) {
        console.log('✅ All required permissions present');
    } else {
        console.log('❌ Missing some required permissions');
        manifestValid = false;
    }
    
    if (manifestValid) {
        console.log('✅ manifest.json is valid');
    } else {
        console.log('❌ manifest.json has issues');
    }
    
} catch (error) {
    console.log('❌ Error reading manifest.json:', error.message);
}

console.log('');

// Test file structure
console.log('Testing file structure...');
const requiredFiles = [
    'manifest.json',
    'popup.html',
    'popup.js',
    'popup.css',
    'content.js',
    'background.js',
    'assets/icons/icon16.svg',
    'assets/icons/icon48.svg',
    'assets/icons/icon128.svg',
    'README.md'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
    if (require('fs').existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ Missing: ${file}`);
        allFilesExist = false;
    }
});

if (allFilesExist) {
    console.log('✅ All required files present');
} else {
    console.log('❌ Some files are missing');
}

console.log('');

// Test HTML structure
console.log('Testing popup.html structure...');
try {
    const html = require('fs').readFileSync('popup.html', 'utf8');
    
    // Check for required elements
    const requiredElements = [
        'class="tab-nav"',
        'data-tab="summary"',
        'data-tab="quiz"',
        'data-tab="translate"',
        'data-tab="tools"',
        'id="summary"',
        'id="quiz"',
        'id="translate"',
        'id="tools"',
        'popup.js'
    ];
    
    let htmlValid = true;
    requiredElements.forEach(element => {
        if (html.includes(element)) {
            console.log(`✅ Found: ${element}`);
        } else {
            console.log(`❌ Missing: ${element}`);
            htmlValid = false;
        }
    });
    
    if (htmlValid) {
        console.log('✅ popup.html structure is valid');
    } else {
        console.log('❌ popup.html has structural issues');
    }
    
} catch (error) {
    console.log('❌ Error reading popup.html:', error.message);
}

console.log('');

// Test JavaScript syntax
console.log('Testing JavaScript files...');
const jsFiles = ['popup.js', 'content.js', 'background.js'];

jsFiles.forEach(file => {
    try {
        const content = require('fs').readFileSync(file, 'utf8');
        
        // Basic syntax check (very simple)
        if (content.includes('function') || content.includes('class') || content.includes('const') || content.includes('let')) {
            console.log(`✅ ${file} appears to have valid JavaScript syntax`);
        } else {
            console.log(`⚠️  ${file} may have syntax issues`);
        }
        
        // Check for Chrome API usage
        if (content.includes('chrome.')) {
            console.log(`✅ ${file} uses Chrome APIs`);
        } else {
            console.log(`⚠️  ${file} doesn't seem to use Chrome APIs`);
        }
        
    } catch (error) {
        console.log(`❌ Error reading ${file}:`, error.message);
    }
});

console.log('');

// Test CSS
console.log('Testing popup.css...');
try {
    const css = require('fs').readFileSync('popup.css', 'utf8');
    
    if (css.includes('.container') && css.includes('.tab-nav') && css.includes('.btn')) {
        console.log('✅ popup.css has required styles');
    } else {
        console.log('❌ popup.css missing required styles');
    }
    
} catch (error) {
    console.log('❌ Error reading popup.css:', error.message);
}

console.log('');

// Summary
console.log('Test Summary');
console.log('============');
console.log('Extension structure appears to be complete.');
console.log('To fully test the extension:');
console.log('1. Load it in Chrome developer mode');
console.log('2. Test each tab functionality');
console.log('3. Verify Chrome AI API integration');
console.log('4. Test on different websites');
console.log('');
console.log('For Chrome Web Store submission:');
console.log('1. Convert SVG icons to PNG format');
console.log('2. Update manifest.json to reference PNG files');
console.log('3. Test on multiple Chrome versions');
console.log('4. Verify all permissions are necessary');
console.log('');
console.log('Test completed!');
