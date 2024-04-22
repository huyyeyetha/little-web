import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function Notification({ sensorId, deviceId }) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const eventSource = new EventSource(
            baseUrl + `/setting/notification?sensorId=${sensorId}&deviceId=${deviceId}`,
        );

        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            if (eventData.DT.isBelowLowerBound == true || eventData.DT.isAboveUpperBound == true) {
                setData(eventData.DT);
                setShow(true);
            }
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
        };
        return () => eventSource.close();
    }, []);
    return (
        <Modal show={show} onHide={() => setShow(false)} centered className="pb-5">
            <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faTriangleExclamation} className="fa-4x text-warning ps-4 pe-1" />
                <div className="w-100">
                    <Modal.Header closeButton className="border-0 pb-0">
                        <Modal.Title className="text-center">Cảnh báo vượt ngưỡng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {sensorId === 'anhsang' ? (
                            <mark className="text-warning bg-transparent">Cường độ ánh sáng</mark>
                        ) : (
                            <mark className="text-primary bg-transparent">Độ ẩm đất</mark>
                        )}
                        đang {data.isBelowLowerBound == true ? 'dưới ngưỡng dưới' : 'vượt ngưỡng trên'} ! <br />
                        Hãy {data.isBelowLowerBound == true ? 'bật' : 'tắt'}
                        {sensorId === 'anhsang' ? (
                            <mark className="text-warning bg-transparent">đèn</mark>
                        ) : (
                            <mark className="text-primary bg-transparent">máy bơm</mark>
                        )}
                        hoặc chuyển sang chế độ tự động
                    </Modal.Body>
                </div>
            </div>
            <Modal.Footer className="border-0">
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Đã hiểu
                </Button>
                <Button
                    variant="success"
                    onClick={() => {
                        navigate('/control?gardenId=1');
                        setShow(false);
                    }}
                >
                    Đến trang điều khiển
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Notification;
