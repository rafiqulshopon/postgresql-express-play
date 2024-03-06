const express = require('express');
const studentRoutes = require('./src/student/routes');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/students', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
