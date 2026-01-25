

export default function Home({user, setUser, view, VIEWS}){
    return (
        <>
            <h1>WELCOME {user.email}</h1>
            <br />
            <div className="transaction-display panel">
                
            </div>
        </>
    )
}