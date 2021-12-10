const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.static('dist'));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});