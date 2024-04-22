import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../services/userService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import background from '../../assets/background.jpg';
import './LoginRegister.scss';

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const defaultIsValid = { username: true, password: true };
    const [isValid, setIsValid] = useState(defaultIsValid);

    const handleLogin = async () => {
        setIsValid(defaultIsValid);
        if (!username) {
            setIsValid({ ...isValid, username: false });
            alert('Username and password are required !');
            return;
        }
        if (!password) {
            setIsValid({ ...isValid, password: false });
            alert('Username and password are required !');
            return;
        }
        const res = await login(username.trim(), password);
        if (res) {
            if (+res.EC === 0) {
                const loginValue = { username: username.trim(), password: password };
                sessionStorage.setItem('loginValue', JSON.stringify(loginValue));
                navigate('/data');
            } else {
                setIsValid({ username: false, password: false });
                alert(res.EM);
            }
        }
    };

    const handleKeyDown = async (e) => {
        if (e.keyCode === 13) {
            await handleLogin();
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            const session = sessionStorage.getItem('loginValue');
            if (session) {
                const loginValue = JSON.parse(session);
                if (loginValue.username && loginValue.password) {
                    const res = await login(loginValue.username, loginValue.password);
                    if (res && +res.EC === 0) {
                        navigate('/data');
                        return;
                    }
                }
                sessionStorage.removeItem('loginValue');
            }
        };
        checkUser();
    }, []);

    return (
        <div className="login-register-page d-flex" style={{ backgroundImage: `url(${background})` }}>
            <div className="band1 position-absolute z-1 top-50 translate-middle p-5 d-flex flex-column gap-4">
                <h2 className="text-white fw-bolder mt-1">Welcome !</h2>
                <h1 className="text-white fw-normal display-5 mb-4">
                    Smart Garden <br /> App
                </h1>
                <NavLink to="/register" className="text-white text-decoration-none m-auto">
                    <div className="button border rounded-pill d-flex gap-2 align-items-center border-3 px-5 py-2">
                        <p className="fw-bolder mb-1 ps-3">Đăng ký </p>
                        <FontAwesomeIcon icon={faArrowRight} className="icon pe-2" />
                    </div>
                </NavLink>
            </div>
            <div className="band2 bg-white m-auto py-5 row justify-content-end">
                <div className="content col-5 px-2">
                    <h2 className="fw-bolder pb-1">Đăng nhập</h2>
                    <form>
                        <div className="form-group my-4">
                            <input
                                type="text"
                                className={isValid.username ? 'form-control' : 'is-invalid form-control'}
                                placeholder="Username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setIsValid(defaultIsValid);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={isValid.password ? 'form-control' : 'is-invalid form-control'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setIsValid(defaultIsValid);
                                }}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="text-end">
                            <button type="button" className="forgot-password mt-1 text-primary">
                                Quên mật khẩu?
                            </button>
                        </div>
                        <button
                            type="button"
                            className="btn btn-success w-100 fw-bolder py-2 mt-3"
                            onClick={() => {
                                handleLogin();
                            }}
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
