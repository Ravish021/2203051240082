const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router/routerUrl');

const route = require('./router/routerUrl');
const PORT = 3000;
app.use(bodyParser.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log("Server running at ", PORT);
});