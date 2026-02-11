export default function SignUp (){
    return (
        <div className="panel">
            <h3 style={{textAlign: "center"}}>ARE YOU AN AGENT? IF NOT SIGN UP HERE...</h3>
                <div className="row mt-3 p-2 ">
                    <div className="col-4">
                        <form>
                            <label>
                                SUBJECT NAME
                                <input type="text" name="name" className="form-control" />
                            </label>
                            <label>
                                ELECTRONIC MAIL
                                <input type="email" name="email" className="form-control" required/>
                            </label>
                            <label>
                                PASSWORD
                                <input type="password" name="password" className="form-control" required/>
                            </label>
                            <button type="submit">:: ++ CREATE PROFILE ++ ::</button>
                        </form>
                    </div>
                    <div className="col-8">
                        <img src="/signup.jpeg" alt="phone" style={{height:"100%", margin:"auto"}} />
                    </div>
                </div>
        </div>

    )
}