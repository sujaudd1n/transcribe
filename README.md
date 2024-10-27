## Getting Started

First, run the frontend development server:

```bash
cd frontend
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

After that run the backend server.

```bash
cd backend
npm install
DEEPGRAM_API_KEY=<apikey> node app.js
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: To transcribe an audio the audio is first sent a server, the server then
send the audio to deepgram to transcribe the audio. Due to cors issue, direct
request to deepgram's server can't be done without proxy.
