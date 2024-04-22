import { useNavigate } from 'react-router-dom';
import { login } from '../services/userService';

function WrapPrivate({ children }) {
    const navigate = useNavigate();
    const checkUser = async () => {
        const session = sessionStorage.getItem('loginValue');
        if (session) {
            const loginValue = JSON.parse(session);
            if (loginValue.username && loginValue.password) {
                const res = await login(loginValue.username, loginValue.password);
                if (res && +res.EC === 0) {
                    return;
                }
            }
            sessionStorage.removeItem('loginValue');
        }
        navigate('/login');
    };
    checkUser();

    return children;
}

export default WrapPrivate;
