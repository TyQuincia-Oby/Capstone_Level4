import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = 3001 //run on different port from REST API/Core Server

app.get('/', (req, res) => {
    res.json({
        message: 'Hello from microservice home route'
    })
    console.log('Home route active')
});

app.listen(PORT, () => {
    console.log(`Microservice running on port ${PORT} `)
});