//transaction_routes/transactions.js
import {response, Router} from 'express'
import express from 'express';
import {supabase} from '../utils/supabase.js';
import {randomUUID} from 'node:crypto'

// //convert a uuid to a BigInt
// // 1. Generate a standard UUID string
// const uuidString = crypto.randomUUID();
// // Example: "b55081fa-9cd1-48c2-95d4-efe2db322a54"

// // 2. Remove the hyphens to get a raw hexadecimal string
// const hexString = uuidString.replace(/-/g, '');
// // Result: "b55081fa9cd148c295d4efe2db322a54"

// // 3. Convert the hexadecimal string to a BigInt
// const uuidNumber = BigInt('0x' + hexString);

// console.log('UUID String:', uuidString);
// console.log('UUID BigInt:', uuidNumber);
// // Example Result: 241008287272164729465721528295504357972n

//set up router
const router = express.Router();

//express routes
//GET LIST of transactions
//TransDisplay component in frontend

router.get('/transactions', async (req, res) => {
    console.log("Hello from transactions route")

    // const authHeader = req.headers.authorization || "";
    // console.log(authHeader)
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
        console.log(error)
        res.status(500).json({
                error: error.message
            })
    }


});

//GET ONE Transaction
//TransDisplay component in frontend
router.get('/transactions/:id', async (req, res) => {
    try{
        //fetch data from table in supabase
        const {data, error} = await supabase
        .from('mtx_transactions') //table name
        .select('*') //read entire table
        .eq('id', req.params.id) //filter ids for the selected id
        .single(); //shows the one item
    
        res.status(200).json(data)
        //let me know if there's an error and if so stop function
        if (error) throw error;
        } catch (error) {
            //handle errors : if the database fails, return error code 500
            console.log(error)
            res.status(500).json({
                    error: error.message
                })

         }
})

//POST NEW Transaction
//TransForm component in frontend
router.post('/transactions', async (req, res) => {
    try {
        //if nothing in request body (req.body) throw error
        if(!req.body ){
            return res.status(400).json({
                message: "MTX_400_EMPTY_PAYLOAD",
                description: "NO_INPUT_DETECTED"
            })
        }

        //things that will be in the req.body
        const { trans_number, trans_date, name, description, deposit, withdrawal, balance, user_id, id } = req.body
 
        //Basic required fields to add new transaction
        //if no trans_date, name or user_id error message appears
        if (!trans_date || !name ){
            return res.status(400).json({
                message: "MTX_400_MISSING_FIELDS",
                description: "REQUIRED_FIELDS_MISSING: trans_date and/or name"
            })
        }

    // A deposit or withdrawal has to have a positive number
    if (deposit < 0 || withdrawal < 0) {
      return res.status(400).json({
        status: '🟥 ERROR',
        code: 'MTX_400_INVALID_AMOUNT',
        signal: 'ILLEGAL_VALUE_STREAM',
        message: 'Deposit and withdrawal must be non-negative'
      });
    }

        //requirements to add a new transaction
        const newTransaction =  { 
            trans_number, 
            trans_date, 
            name, 
            description, 
            deposit, 
            withdrawal, 
            balance, 
            user_id:randomUUID(),
            id
        };

        //update supabase with new transaction
        const {data, error} = await supabase //connect to supabase
        .from('mtx_transactions') //update mtx_transactions table
        .insert(newTransaction) //with new transaction
        .select() //read list
        .single(); //adds new transaction

        if (error) throw error;

       console.log("NEW TRANSACTION ADDED SUCCESSFULLY")
        
       res.status(201).json({
        status: '🟩 TRANSACTION_COMMITTED',
        data
       });

    } catch (error) {
        return res.status(500).
        json({
            status: '🟥 TRANSACTION_FAILED',
            error: error.message
        })
    }
})

//PUT UPDATE Transaction
// ==> ↻ <== on transaction line on TransDisplay component
router.put('/transactions/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {trans_number, trans_date, name, description, deposit, withdrawal, balance} = req.body;

        //makes sure theres an id to find
        if (!id){
            return res.status(400).json({
                status: "🟥 ERROR",
                message: "MISSING_TRANSACTION_ID"
            });
        }

        //request must have a transaction date or name
        if (!trans_date || !name) {
            return res.status(400).json({
                status: "🟥 ERROR",
                message: "REQUIRED_FIELDS_MISSING"
            })
        }

        //withdrawal or deposit amount must be above 0
        if(deposit <0 || withdrawal <0) {
            return res.status(400).json({
                status: "🟥 ERROR",
                message: "INVALID_TRANSACTION_AMOUNT"
            })
        }

        const {data, error} = await response
        .from('mtx_transactions')
        .update({
            trans_number,
            trans_date,
            name,
            description,
            deposit,
            withdrawal,
            balance
        })
        .eq('id', id)
        .select()
        .single();

        if (error) throw error;

        res.status(200).json({
            status: "TRANSACTION UPDATED",
            data
        })

    } catch (error){
        console.error("UPDATE_FAILED", error);
        res.status(500).json({
            status: "🟥 UPDATE_FAILED",
            error: error.message
        })
    }
});

//DELETE Transaction
// ==> ✖ <== on transaction line on TransDisplay component
router.delete('/transactions/:id', async (req, res) => {

})

export default router;