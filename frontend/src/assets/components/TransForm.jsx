import {useState, useEffect} from 'react';

export function TransForm ({onTransactionAdded, onClose}){
    //tracking transaction type
    const [type, setType] = useState("");
        
            async function handleSubmit(event){
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

                //only include the type (withdrawal or deposit) 
                // when selected as select option
                deposit : type === "deposit" ? deposit:null,
                withdrawal: type === "withdrawal" ? withdrawal:null,
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
            
            if (response.ok){
                onTransactionAdded?.();//refresh list
                console.log("NEW TRANSACTION SUCCESSFUL")
                onClose(); //close new transaction form
                //Clear forms after submitting
                event.target.reset();  
            } else {
                console.error("ERROR ADDING TRANSACTION")
            }

      
    }



    return(
        <>
        //form will pop up on top of everything in screen
        <div className="modal fade show d-block panel " tabIndex="-1">

            {/* form content centered on page */}
            <div className="modal-dialog modal-lg modal-dialog-centered ">
                            
                
                <div className="modal-content">
                    <div className = "modal-header">
                        <h5 className="modal-title">CREATE NEW TRANSACTION</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        {/* forms */}
                            <form onSubmit={handleSubmit} className="transForm">
                                <div className="mb-2 row">
                                    <div className="col text-center">
                                        <label >
                                            NAME
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input type="text" name="name" className="form-control" required />
                                    </div>
                                </div>
                                <br />
                                <div className="mb-2 row">
                                    <div className="col text-center">
                                        <label >
                                            REFERENCE ID
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input type="number" name="transNumber" className="form-control" required />
                                    </div>
                                </div>
                                <br />
                                <div className="mb-2 row">
                                    <div className="col text-center">
                                        <label>
                                            DATE
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input type="date" name="date" className="form-control" required/>
                                    </div>
                                </div>
                                <br />
                                <div className="mb-2 row">
                                    <div className="col text-center">
                                        <label >
                                            DESCRIPTION
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input type="text" name="description" className="form-control" required/>
                                    </div>
                                </div>

                                <br />
                                <div className="mb-2 row">
                                    <div className="col text-center">
                                        TRANSACTION TYPE
                                    </div>
                                    <div className="col">
                                        <select 
                                        className='form-select' 
                                        value={type} //type can be deposit or withdrawal
                                        onChange={(e) => setType(e.target.value)} 
                                        //when the type is changed in the input set it to that type
                                        >
                                            <option value="" default>Please Select</option>
                                            <option value="deposit" >Deposit</option>
                                            <option value="withdrawal" >Withdrawal</option>
                                        </select>
                                    </div>
                                </div>
                                {/* if type is deposit a form for deposit will appear */}
                                {type === "deposit" &&
                                <div className="mb-2 row">
                                    <div className="col text-center">
                                        <label>
                                            DEPOSIT 
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input type="number" name="deposit" className="form-control" />
                                    </div>
                                </div>
                                }
                                {/* if type is withdrawal a form for withdrawal will appear */}
                                {type === "withdrawal" &&
                                <div className="mb-2 row">
                                    <div className="col text-center">
                                        <label >
                                            WITHDRAWAL
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input type="number" name="withdrawal" className="form-control"/>
                                    </div>
                                </div>}

                                <br />
                                
                                <div className="mb-2 row">
                                    <div className="col text-center">
                                        <label>
                                            BALANCE
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input type="number" name="balance" className="form-control"/>
                                    </div>
                                </div>
                                
                                <br />

                                <div className="mb-2 row">
                                    <div className="col text-center">
                                        <label>
                                            UNIQUE ID
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input name="id" type="password" className="form-control" required />
                                    </div>
                                </div>
                            <br />

                            <button type="submit">:: ++ ADD ++ ::</button>
                        </form>
                    </div>
                        
                    <div className="modal-footer">
                    <button onClick={onClose}>
                        :: ++ CANCEL ++ ::
                    </button>
                    </div>
                </div>
            </div>
        </div>
        {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
      </>
    )
}