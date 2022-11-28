console.log('tuantran - express - running');

const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res, next) => {
    // cydb - RES.SEND, RES.RENDER, RES.JSON
    res.send('<h3>TuanTran - hello world</h3>');
});

app.listen(PORT, () => {
    console.log(`SERVER EXPRESS is RUNNING in PORT = ${PORT}`);
})