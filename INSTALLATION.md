# AI StudyPal Installation Guide

## Prerequisites

- Google Chrome browser (version 88 or later)
- Chrome AI features enabled (if available in your region)
- Developer mode access for local installation

## Installation Methods

### Method 1: Chrome Web Store (Recommended)
1. Visit the Chrome Web Store
2. Search for "AI StudyPal"
3. Click "Add to Chrome"
4. Confirm the installation
5. Pin the extension to your toolbar

### Method 2: Developer Installation (For Testing)

#### Step 1: Download the Extension
1. Clone or download this repository
2. Extract the files to a folder on your computer

#### Step 2: Enable Developer Mode
1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Toggle "Developer mode" in the top-right corner

#### Step 3: Load the Extension
1. Click "Load unpacked" button
2. Select the folder containing the extension files
3. The extension should now appear in your extensions list

#### Step 4: Pin the Extension
1. Click the puzzle piece icon in Chrome's toolbar
2. Find "AI StudyPal" and click the pin icon
3. The extension icon should now appear in your toolbar

## Verification

### Test the Installation
1. Navigate to any webpage (try the included `test-page.html`)
2. Click the AI StudyPal icon in your toolbar
3. You should see the popup with 4 tabs:
   - 📝 Summary
   - ❓ Quiz
   - 🌐 Translate
   - 🛠️ Tools

### Test Basic Functionality
1. Go to the Summary tab
2. Click "Generate Summary"
3. You should see a summary of the current page (if Chrome AI APIs are available)

## Troubleshooting

### Extension Not Loading
- Ensure all files are in the correct directory structure
- Check that `manifest.json` is valid
- Verify Chrome version compatibility

### Chrome AI APIs Not Available
- Update Chrome to the latest version
- Check if AI features are available in your region
- Verify Chrome AI APIs are enabled in your browser

### Permission Issues
- Ensure the extension has the required permissions
- Check that the extension is allowed to run on the current page
- Try refreshing the page after installation

### Performance Issues
- Close unnecessary tabs to free up memory
- Restart Chrome if the extension becomes unresponsive
- Check Chrome's task manager for resource usage

## Uninstallation

### Remove from Chrome
1. Go to `chrome://extensions/`
2. Find "AI StudyPal" in the list
3. Click "Remove"
4. Confirm the removal

### Clean Up Files
1. Delete the extension folder from your computer
2. Clear any cached data if needed

## Support

If you encounter any issues during installation:

1. Check the [README.md](README.md) for detailed information
2. Review the [GitHub Issues](https://github.com/yourusername/ai-studypal/issues)
3. Contact support at support@aistudypal.com

## System Requirements

- **Operating System**: Windows 10+, macOS 10.14+, or Linux
- **Browser**: Google Chrome 88 or later
- **Memory**: At least 4GB RAM recommended
- **Storage**: 10MB free space
- **Internet**: Required for Chrome AI APIs (if available)

## Privacy Notice

AI StudyPal processes all data locally using Chrome's built-in AI features. No data is sent to external servers or collected by the extension developers.
