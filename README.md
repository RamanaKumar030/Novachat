# ◈ NovaChat

A ChatGPT-like chatbot built with Next.js + OpenAI API.
Streaming responses, conversation memory, dark mode, starter prompts.

---

## 🚀 Run in 3 Steps

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Add your API key
```bash
cp .env.example .env.local
```
Open `.env.local` and replace `sk-...your-key-here...` with your actual OpenAI key.
Get one at: https://platform.openai.com/api-keys

### Step 3 — Start the app
```bash
npm run dev
```
Open http://localhost:3000 → done ✓

---

## Using Groq instead of OpenAI (free + faster)

1. Get a free key at https://console.groq.com
2. In `.env.local`, add: `GROQ_API_KEY=gsk_...`
3. In `pages/api/chat.js`, change:
   - fetch URL → `https://api.groq.com/openai/v1/chat/completions`
   - `Authorization: Bearer ${process.env.GROQ_API_KEY}`
   - model → `llama3-8b-8192`

---

## Deploy to Vercel (2 min)

```bash
npm install -g vercel
vercel
```
Set `OPENAI_API_KEY` as an environment variable in your Vercel dashboard.

---

## Project Structure

```
novachat/
├── pages/
│   ├── index.js        ← Chat UI
│   └── api/
│       └── chat.js     ← Backend (LLM call)
├── .env.example        ← Copy to .env.local
├── .env.local          ← Your keys (git ignored)
└── package.json
```

---

## Customise the bot

Edit the `SYSTEM_PROMPT` in `pages/api/chat.js`:
```js
const SYSTEM_PROMPT = `You are Nova, a sharp and friendly AI assistant...`
```
Change the name, personality, and domain to make it your own.
