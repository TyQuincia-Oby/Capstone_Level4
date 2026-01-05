import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors()); //enables cors requests

app.get('/', (req, res) =>{
    res.json({
        message: 'Hello from backend home route'
    });
    console.log('Backend home route active')
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`)
});

