import {useState, useEffect} from 'react';
import supabase from '../../utils/supabase';


export function TransForm ({handleAddTrans}){
        
            async function handleAddTrans(event){
            //prevents page refreshing
            event.preventDefault();    
            
            console.log(event)

            console.log("transaction added")
            console.log("name" + event.target.elements.name.value);
            console.log("transNumber: " + event.target.elements.transNumber.value);
            console.log("date: " + event.target.elements.date.value);
            console.log("description: " + event.target.elements.description.value);
            console.log("deposit: " + event.target.elements.deposit.value);
            console.log("withdrawal: " + event.target.elements.withdrawal.value);
            console.log("balance: " + event.target.elements.balance.value);

            //Variable storage for user input
            const name = event.target.elements.name.value;
            const transNumber = event.target.elements.transNumber.value;
            const date = event.target.elements.date.value;
            const description = event.target.elements.description.value;
            const deposit = event.target.elements.deposit.value;
            const withdrawal = event.target.elements.withdrawal.value;
            const balance = event.target.elements.balance.value;
            const id = event.target.elements.id.value;

            //NEW Transaction variables set from user input
            let newTransaction = {
                name : name, 
                trans_number : transNumber,
                trans_date : date,
                description : description,
                deposit : deposit,
                withdrawal: withdrawal,
                balance: balance,
                id : id
            }

            //Print new transaction created
            console.log(newTransaction);

            //POST NEW Transaction to Supabase table
            const response = await fetch("http://localhost:3000/api/data/transactions",{
                method : "POST", 
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(newTransaction)
            })
            
            const result = await response.json()

            console.log(response)
            console.log(result)

            if (response.ok){
                console.log("NEW TRANSACTION SUCCESSFUL")
            } else {
                console.error("ERROR ADDING TRANSACTION")
            }

            //Clear forms after submitting
            event.target.reset();

            await supabase.from("mtx_transactions").insert(newTransaction);
        
        
    }



    return(
        <div className = "transaction-display panel">
            <h4 style={{textAlign: "center"}}>CREATE NEW TRANSACTION</h4>
            <form onSubmit={handleAddTrans} className="transForm">
                <label>
                    NAME
                    <input type="text" name="name" required />
                </label>

                <br />

                <label>
                    REFERENCE ID
                    <input type="number" name="transNumber" required />
                </label>

                <br />

                <label>
                    DATE 
                    <input type="date" name="date" required/>
                </label>

                <br />

                <label>
                    DESCRIPTION
                    <input type="text" name="description" required/>
                </label>

                <br />


                <label>
                    DEPOSIT 
                    <input type="number" name="deposit" />
                </label>

                <br />

                <label>
                    WITHDRAWAL
                    <input type="number" name="withdrawal" />
                </label>

                <br />

                <label>
                    BALANCE
                    <input type="number" name="balance" />
                </label>
                
                <br />

                <label>
                    UNIQUE ID
                    <input name="id" type="password" required />
                </label>

                <br />

                <button type="submit">:: ++ ADD ++ ::</button>
            </form>

        </div>
    )
}