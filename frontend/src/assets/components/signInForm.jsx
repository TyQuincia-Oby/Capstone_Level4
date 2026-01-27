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

            <h4 style={{textAlign:"center"}}>YOUR ACCOUNT AWAITS YOU</h4>
            <img src="/login-btn.jpeg" alt="shield" style={{display: "flex", justifyContent:"center", alignItems: "center", height: "50%"}} />
            <form onSubmit={handleSignIn}>
                <label htmlFor="email">ELECTRONIC MAIL
                    <input type="text" name="email" id="email" required />
                </label>

                <br />

                <label htmlFor="password" name="password">PASSWORD
                    <input type="password" name="password" id="password" required />
                </label>

                <br />

                <button type="submit">:: ++ ENTER ++ ::</button>
            </form>
        </div>
    )
}