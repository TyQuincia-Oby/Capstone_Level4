import {useState, useEffect} from 'react';
import supabase from '../../utils/supabase';

export function TransForm ({onTransactionAdded, fetchTransactions,showForm, onClose, setShowForm, tx}){
    //tracking transaction type
    const [type, setType] = useState("");
    const [toast, setToast] = useState(null);
    const isEdit = !!tx; //check if a transaction 
    const [depositAmount, setDepositAmount] = useState(tx?.deposit || "");
    const [withdrawalAmount, setWithdrawalAmount] = useState(tx?.withdrawal || "");
    const [balance, setBalance] = useState(tx?.balance || 0);

    // is being updated (for put route)

    // 🧠 Prefill form when editing
  useEffect(() => {

    if (tx){
        setType(tx.deposit ? "deposit" : tx.withdrawal ? "withdrawal" : "");
        }
    }, [tx]);

    useEffect(() => {
  const dep = parseFloat(depositAmount) || 0;
  const wit = parseFloat(withdrawalAmount) || 0;
  const startingBalance = parseFloat(tx?.balance) || 0;

  if (type === "deposit") {
    setBalance(startingBalance + dep);
  } else if (type === "withdrawal") {
    setBalance(startingBalance - wit);
  } else {
    setBalance(startingBalance);
  }
}, [depositAmount, withdrawalAmount, type, tx]);


    function showToast(message){
        setToast(message);
        setTimeout(() => setToast(null), 3000)
    }
        
        async function handleSubmit(event){
        //prevents page refreshing
        event.preventDefault();    

        
        //Variable storage for user input
        const name = event.target.elements.name.value;
        const transNumber = event.target.elements.transNumber.value;
        const date = event.target.elements.date.value;
        const description = event.target.elements.description.value;
        const deposit = type === "deposit" ? depositAmount: null;
        const withdrawal = type === "withdrawal" ? withdrawalAmount : null;
        const finalBalance = balance; //auto-calculates
        const id = event.target.elements.id.value;
        
        //*****CHECK FOR ERRORS *****/
        /*Get user data */
        const { data: { user } } = await supabase.auth.getUser()
        const userId = user.id
        console.log(userId)

        /****Add in user session*****/
        // const { data, error } = await supabase.auth.getSession()
        // const userSession = user.data

        

        //NEW Transaction variables set from user input
        let newTransaction = {
            name, 
            trans_number : transNumber,
            trans_date : date,
            description,

            //only include the type (withdrawal or deposit) 
            // when selected as select option
            deposit,
            withdrawal,
            balance: finalBalance,
            id,
            user_id: userId
        }

        //Print new transaction created
        console.log(newTransaction);

        const url = isEdit
        ? `http://localhost:3000/api/data/transactions/${tx.id}`
        : `http://localhost:3000/api/data/transactions`

        //POST NEW Transaction to Supabase table
        const method = isEdit ? "PUT" : "POST";

        try{
            const response = await fetch(url, {
            method,
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newTransaction)
        });
        
        if (!response.ok) throw new Error();

            onTransactionAdded?.();//refresh list
            onClose(); //close new transaction form
            showToast(isEdit ? "TRANSACTION UPDATED":"NEW TRANSACTION SUCCESSFUL")
            //Clear forms after submitting
            event.target.reset();  
        
        } catch (err)  {
            console.error(err);
            showToast("TRANSACTION FAILED❌");
        }
    }

    return(
        <>
        
        {/* //form will pop up on top of everything in screen */}
        <div className="modal fade show d-block panel " tabIndex="-1">

            {/* form content centered on page */}
            <div className="modal-dialog modal-lg modal-dialog-centered ">
                            
                
                <div className="modal-content">
                    <div className = "modal-header">
                        <h5 className="modal-title">
                            <img src="/mtx-logo2.jpeg" alt="letter-m"  style={{height:"40px", margin: "5px"}}/>
                            {isEdit ? "EDIT TRANSACTION" : "CREATE NEW TRANSACTION"}
                            </h5>
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
                                        <input type="text" name="name" className="form-control" defaultValue={tx?.name || ""}required />
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
                                        <input type="number" name="transNumber" className="form-control" defaultValue={tx?.trans_number || ""}required />
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
                                        <input type="date" name="date" className="form-control" defaultValue={tx?.trans_date || ""}required/>
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
                                        <input type="text" name="description" className="form-control" defaultValue={tx?.description || ""}required/>
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
                                        <input type="number" name="deposit" className="form-control" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
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
                                        <input type="number" name="withdrawal" className="form-control" value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(e.target.value)}/>
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
                                        <input type="number" name="balance" className="form-control" value={balance} readOnly/>
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
                                        <input name="id" 
                                        type="password" 
                                        className="form-control" 
                                        defaultValue={tx?.id || ""}
                                        disabled={isEdit} /*cant change id when updating */
                                        required />
                                    </div>
                                </div>
                            <br />
                            <button type="submit">
                                {isEdit ? ":: ++ UPDATE ++ ::" : ":: ++ ADD ++ ::"}
                            </button>
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
      {toast && <div className="toast show position-fixed bottom-0 end-0 m-3 p-2 bg-dark text-white">{toast}</div>}
      </>
    )
}