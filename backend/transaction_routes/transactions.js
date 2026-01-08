//transaction_routes/transactions.js

import express from 'express';
import { supabase } from '../utils/supabase.js';

//set up router
const router = express.Router();

//express routes
//GET LIST of transactions
router.get('/transactions', async (req, res) => {
    console.log("Hello from transactions route")
    //fetching data from mtx_transaction table in Supabase
    try{
        const {data , error } = await supabase
        .from('mtx_transactions') //table name
        .select('*'); //read everything

        //let me know if there's an error and if so stop function
        if (error) throw error;
        
        //return data with status code 200
        res.json(data);
    } catch (error) {
        //handle errors : if the database fails, return error code 500
        res.status(500).json({
                error: "error.message"
            })
    }
});

//GET ONE Transaction
router.get('/transactions/:id', async (req, res) => {

})

//POST NEW tran

export default router;