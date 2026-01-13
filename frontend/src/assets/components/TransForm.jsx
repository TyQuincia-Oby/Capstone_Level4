export function TransForm (){
    return(
        <div className = "transaction-display panel">
            <h4 style={{textAlign: "center"}}>CREATE NEW TRANSACTION</h4>
            <div className="form">
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
                    <input type="password" required />
                </label>

                <br />

                <button type="submit">:: ++ ADD ++ ::</button>
            </div>

        </div>
    )
}