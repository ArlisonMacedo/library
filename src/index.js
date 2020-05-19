const express = require('express');
const routes = require('./Routes');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);


app.listen(process.env.PORT || 3333);