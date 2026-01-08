import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {supabase} from './utils/supabase.js';
import transactions from './transaction_routes/transactions.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //parse response to JSON
app.use(cors()); //enables cors requests
app.use('/api/data', transactions); //routes for transactions

app.get('/', (req, res) =>{
    res.json({
        message: 'Hello from backend home route'
    });
    console.log('Backend home route active')
});

app.listen(PORT, () => {
    console.log(`Backend Server running on port ${PORT}`)
});

