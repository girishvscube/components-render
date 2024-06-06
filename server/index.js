const express = require('express');
const { data } = require('./data');
const cors = require('cors');
const app = express();

app.use(cors());
app.get('/form-data', (req, res) => {
  res.send(data);
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});