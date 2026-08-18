# Treehouse Newsletter Signup

Next.js (App Router) + MUI single page application for viewing, adding, and removing newsletter subscribers.

## Setup

Create a `.env` file with the API key:

```
API_KEY=your-api-key
```

The key is only read on the server, so it is never exposed to the browser.

```
npm install
npm run dev
```

## Pages

- `/` — subscriber list, newest first, with delete
- `/add` — form to add a subscriber (name and email required)
