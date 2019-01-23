
const express = require('express');
const app = express();
const morgan = require('morgan')


app.get('/api/v1', require('./routers/AnalyticsRouter'))

app.get('/', async (req, res) => {
    await res.send('Hello World'); 
});



const port = process.env.port | 80;
app.listen(port, () => console.log(`listening on port ${port}`));
