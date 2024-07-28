
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
const routes = require('./routes');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB();
app.use('/api', routes);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
});
