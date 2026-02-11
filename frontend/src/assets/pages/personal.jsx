import { TransForm } from "../components/TransForm"

export default function Personal({user, finalBalance}){
    return(
        <div>
            <div className="panel mb-5">
                <h2>WELCOME BACK TO THE SYSTEM {user.email} </h2>
                <h4>ACCOUNT ID: {user.id}</h4>
                {/* <img src="/login-btn.jpeg" alt="shield" style={{height: "100px"}}/> */}
            </div>
        
            {/* <div className="transaction-display panel">
                <h3>TOTAL BALANCE ${finalBalance}</h3>
            </div> */}

        </div>
    )
}