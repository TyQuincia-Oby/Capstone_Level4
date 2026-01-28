import {useEffect} from "react";
import "/vault.css"; //vault has own css

export default function Vault({setView, VIEWS}){ 
    //after vault animation, page will navigate 
    // to TRANSACTION page automatically

    useEffect(() => {
        const timer = setTimeout(() => {
            setView(VIEWS.TRANSACTIONS); //navigate to home page 
            // after timer is up
        }, 2500);//length of vault animation

        return () => clearTimeout(timer);
    }, []); //after timer is done clear timer

    return (
        <div className="vault-screen">
            <div className="vault-door">
                <div className="vault-wheel"></div>
            </div>
            <h2 className="vault-text">ACCESS GRANTED</h2>
        </div>
    );
}