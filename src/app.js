require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/v1/route');
const PORT = process.env.PORT;

// to know how body request type
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`artwork app listening at http://localhost:${PORT}`);
});
