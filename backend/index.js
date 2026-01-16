// Entry point for the hackathon backend server.
// Loads environment variables, wires the Express app, and starts listening.

require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Hack backend server listening on port ${PORT}`);
});
