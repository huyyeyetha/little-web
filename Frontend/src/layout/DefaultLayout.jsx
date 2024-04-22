import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { privateRoutes } from '../routes/AppRoutes';
import ModalLogout from '../components/ModalLogout';
import Notification from '../components/Notification';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import background from '../assets/background.jpg';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div className="default-layout" style={{ backgroundImage: `url(${background})` }}>
            <div className="header d-flex mb-3">
                <div className="pages m-auto ps-5 d-flex">
                    {privateRoutes.map(
                        (route, index) =>
                            route.title && (
                                <NavLink
                                    to={route.path}
                                    key={index}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'link d-block text-white text-decoration-none px-5 active'
                                            : 'link d-block text-decoration-none px-4 inactive'
                                    }
                                >
                                    {route.title}
                                </NavLink>
                            ),
                    )}
                </div>
                <div className="logout d-flex">
                    <button type="button" title="Logout" className="m-auto p-2 ps-3 fs-5" onClick={handleShow}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </button>
                </div>
                <ModalLogout show={showModal} handleClose={handleClose} />
            </div>
            <div className="container content">
                <Notification sensorId="anhsang" deviceId="den" />
                <Notification sensorId="doamdat" deviceId="maybom" />
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;
