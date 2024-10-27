const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8000;
app.use(cors());

const apiKey = process.env.DEEPGRAM_API_KEY;
const upload = multer({ storage: multer.memoryStorage() });

app.post('/transcribe', upload.single('myBlob'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file provided.');
    }
    const fileBuffer = req.file.buffer;
    const url = "https://api.deepgram.com/v1/listen";

    const audioData = fileBuffer;
    console.log(req.file)

    // Define request headers
    const headers = {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "audio/wav",
    };

    // Make the POST request using axios
    //
    // https://github.com/deepgram-devs/code-samples/blob/main/languages/javascript/speech-to-text/prerecorded/local/axios/index.js
    axios
      .post(url, audioData, { headers: headers })
      .then((response) => {
        console.log(response.data); // Handle response data
        res.send(response.data.results.channels[0].alternatives[0].transcript);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
      });
  } catch (error) {
    console.error('Error Transcribing:', error.message);
    res.status(500).send('Error transcribing audio.');
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
