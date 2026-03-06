# 🧠 FlowMind AI - Chrome Extension

**Never lose context again.** Select text anywhere on the web and instantly summarize, translate, simplify, or break it down without leaving the page.

---

## ✨ Features

- **📝 Summarize** - Get concise summaries of long articles and texts
- **🌍 Translate** - Support for English, Urdu, Roman Urdu, Spanish, French, and Arabic
- **🎯 Simplify** - Break down complex text into simple, digestible language
- **👶 Explain Like I'm 5** - Get child-friendly explanations of anything
- **📋 Bullet Points** - Convert text into structured bullet-point format
- **🎨 Beautiful UI** - Modern, responsive popup with smooth animations
- **⚡ Lightning Fast** - Instant results powered by Groq's LLaMA API
- **🔄 Multiple Languages** - Choose your output language for any action

---

## 🛠️ Tech Stack

**Frontend:**
- Vanilla JavaScript (ES6+)
- CSS3 (with gradients, flex, and animations)
- Chrome Extensions API
- Content Scripts & DOM manipulation

**Backend:**
- Python 3.x
- FastAPI
- Groq API (LLaMA 3.1 8B)
- CORS middleware for cross-origin requests

---

## 📦 Project Structure

```
FlowMind-extension/
├── extension/
│   ├── content.js          # Content script (runs on web pages)
│   ├── style.css           # Popup styling
│   └── manifest.json       # Chrome extension manifest
├── backend.py              # FastAPI backend server
├── config.py               # Configuration (API keys)
└── README.md              # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip (Python package manager)
- Chrome/Chromium browser
- Groq API key (get it free at [groq.com](https://groq.com))

### Installation

#### 1. Clone / Download the Repository

```bash
git clone https://github.com/AaimaFarrukh/FlowMind-extension.git
cd FlowMind-extension
```

#### 2. Set Up Python Backend

Install dependencies:
```bash
pip install fastapi uvicorn groq python-dotenv
```

#### 3. Configure API Keys

Create a `config.py` file in the root directory:

```python
# config.py
GROQ_API_KEY = "your_groq_api_key_here"
```

Or set as environment variable:
```bash
export GROQ_API_KEY="gsk_xxxxxxxxxxxxx"
```

#### 4. Start the Backend Server

```bash
uvicorn backend:app --reload --port 8000
```

You should see:
```
Uvicorn running on http://127.0.0.1:8000
Application startup complete
```

#### 5. Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `FlowMind-extension/extension` folder
5. Done! The extension is now active.

---

## 📖 How to Use

1. **Select any text** on a webpage
2. **Click the action button** you want:
   - Summarize
   - Translate
   - Simplify
   - Explain Like I'm 5
   - Bullet Points
3. **Choose your output language** from the dropdown
4. **Get instant results** in the popup
5. **Copy** the result with one click
6. **Close popup** by clicking the X or clicking outside

---

## 🔌 API Endpoints

### POST /process

Processes text with AI actions.

**Request:**
```json
{
  "text": "Your text here...",
  "action": "summarize|translate|simplify|eli5|bullets",
  "language": "english|urdu|roman-urdu|spanish|french|arabic"
}
```

**Response:**
```json
{
  "result": "Processed text result..."
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/process \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Artificial intelligence is transforming industries...",
    "action": "summarize",
    "language": "urdu"
  }'
```

---

## ⚙️ Configuration

### Supported Languages

| Code | Language |
|------|----------|
| `english` | English |
| `urdu` | Urdu (اردو) |
| `roman-urdu` | Roman Urdu |
| `spanish` | Spanish |
| `french` | French |
| `arabic` | Arabic (العربية) |

### Available Actions

- `summarize` - Concise summary
- `translate` - Translation to target language
- `simplify` - Simple version
- `eli5` - Child-friendly explanation
- `bullets` - Bullet-point format

---

## 🎨 UI/UX Highlights

- **Purple gradient theme** - Modern, professional look
- **Smooth animations** - Hover effects and transitions
- **Responsive design** - Works on all screen sizes
- **Custom scrollbar** - Theme-matching scroll styling
- **Close button** - Top-right X to dismiss popup
- **Outside-click close** - Click anywhere outside to close

---

## 🧪 Testing

### Test the Backend

```bash
# Start backend
uvicorn backend:app --reload --port 8000

# In another terminal, test endpoint
curl -X POST http://localhost:8000/process \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world", "action": "summarize", "language": "english"}'
```

### Test the Extension

1. Load extension in Chrome (see Installation #5)
2. Visit any website (e.g., news articles, blogs)
3. Select text and click action buttons
4. Verify that the popup works and returns results

---

## 🚧 Known Limitations

- Backend must be running on `localhost:8000`
- Works best with text selections of 50-5000 characters
- API calls depend on Groq service availability
- Some websites with strict CSP may have compatibility issues

---

## 🎯 Future Enhancements

- [ ] Add keyboard shortcuts (Ctrl+Shift+S, etc.)
- [ ] Save conversation history to local storage
- [ ] Dark mode support
- [ ] Export results as PDF/markdown
- [ ] Custom action creation
- [ ] Word count and reading time display
- [ ] Multiple AI model support (GPT, Claude, Gemini)
- [ ] Cloud sync across devices
- [ ] Settings page with custom prompts

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License. See LICENSE file for details.

---

## 👨‍💻 Author

Built with ❤️ because tab-switching is annoying.

---

## 💬 Support & Feedback

- Found a bug? Open an [Issue](https://github.com/AaimaFarrukh/FlowMind-extension/issues)
- Have an idea? Create a [Discussion](https://github.com/AaimaFarrukh/FlowMind-extension/discussions)
- Want to chat? Reach out on [LinkedIn](https://linkedin.com/in/aaimafarrukh)

---

## 📚 Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Groq API Docs](https://console.groq.com/docs)
- [JavaScript Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)

---

**Happy coding! 🚀**
**Aaima Farrukh**
***AI Engineer | ML | Data Science***

