import {useState} from 'react'
import supabase from '../../utils/supabase';




export function SignIn({user, setUser, setView, VIEWS}) {
    
    
    async function handleSignIn (e){
        //prevents page from constant reloading
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;


        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (!error ){
            setUser(data.user);//if no error log in user
            console.log(data.user);
            setView(VIEWS.VAULT);//navigate to vault screen
            console.log("SIGN IN SUCCESSFUL" )
        } else {
            console.log("Error: " 
                + error.message)
            return;
        }  
    }


    return (
        <div className="transaction-display panel">

            <h2 style={{textAlign:"center"}}>YOUR ACCOUNT AWAITS YOU</h2>
            <div className="row">
                <div className="col-4">
                    <h4 style={{textAlign:"center"}}>SIGN IN HERE</h4>
                    <img src="/login-btn.jpeg" alt="shield" style={{display: "flex", justifyContent:"center", alignItems: "center", height: "50%"}} />
                    <form onSubmit={handleSignIn}>
                        <h5>
                            <label htmlFor="email" style={{textAlign:"center"}}>ELECTRONIC MAIL
                                <input type="text" name="email" id="email" required />
                            </label>
                        </h5>

                        <br />

                        <h5>
                            <label htmlFor="password" name="password" style={{textAlign:"center"}}>PASSWORD
                                <input type="password" name="password" id="password" required />
                            </label>
                        </h5>

                        <br />

                        <button type="submit">:: ++ ENTER ++ ::</button>
                    </form>
                </div>
                <div className="col">
                    <h4 style={{textAlign:"center"}}>MTX APP FEATURES</h4>
                </div>
            </div>
        </div>
    )
}