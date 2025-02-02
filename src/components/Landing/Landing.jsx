import { useNavigate } from "react-router"


const Landing = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1>This the landing page for new users</h1>
            <button onClick={() => navigate('/sign-up')}>Sign Up</button>
            <button onClick={() => navigate('/sign-in')}>Sign In</button>
        </>
    );
};

export default Landing;