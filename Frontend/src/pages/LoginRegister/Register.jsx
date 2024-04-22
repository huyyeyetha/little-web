import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import background from '../../assets/background.jpg';
import './LoginRegister.scss';

function Register() {
    return (
        <div className="login-register-page d-flex" style={{ backgroundImage: `url(${background})` }}>
            <div className="band1 position-absolute z-1 top-50 translate-middle p-5 d-flex flex-column gap-4">
                <h2 className="text-white fw-bolder mt-1">Welcome !</h2>
                <h1 className="text-white fw-normal display-5 mb-4">
                    Smart Garden <br /> App
                </h1>
                <NavLink to="/login" className="text-white text-decoration-none m-auto">
                    <div className="button border rounded-pill d-flex gap-2 align-items-center border-3 px-5 py-2">
                        <p className="fw-bolder mb-1 ps-3">Đăng nhập </p>
                        <FontAwesomeIcon icon={faArrowRight} className="icon pe-2" />
                    </div>
                </NavLink>
            </div>
            <div className="band2 bg-white m-auto py-5 row justify-content-end">
                <div className="content col-5 px-2">
                    <h2 className="fw-bolder pb-1">Đăng ký tài khoản</h2>
                    <form>
                        <div className="form-group my-4">
                            <input type="text" className="form-control" placeholder="Username" />
                        </div>
                        <div className="form-group my-4">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Retype password" />
                        </div>
                        <button type="button" className="btn btn-success w-100 fw-bolder py-2 mt-4">
                            Đăng ký
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
