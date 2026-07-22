import { Link } from "react-router-dom";


function DemoHome() {
    return (
        <div>
            <Link to="/login" >Go to Login</Link>
            <Link to="/register">Register</Link>
        </div >
    )
}

export default DemoHome