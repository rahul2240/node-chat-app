const express = require('express');
const path = require('path');
const app = express();


const PublicPath = path.join(__dirname + '../public');
const port = 3000;

app.use(express.static(PublicPath));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
