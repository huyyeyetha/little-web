import { useEffect, useState } from 'react';
import { useParams, useSearchParams, NavLink } from 'react-router-dom';
import LiveChart from '../../../components/LiveChart';
import HistoryTable from '../../../components/HistoryTable/HistoryTable';
import { getSensorInfo } from '../../../services/webService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faDroplet, faLeaf, faTemperatureHigh, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import './SensorData.scss';

function SensorData() {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const sensorId = params.sensorId;
    const gardenId = searchParams.get('gardenId');

    const renderData = {
        anhsang: {
            title: 'Cường độ ánh sáng',
            icon: <FontAwesomeIcon color="#FFF732" icon={faLightbulb} />,
            bg: '#FFF732',
        },
        doamdat: { title: 'Độ ẩm đất', icon: <FontAwesomeIcon color="#44C7FF" icon={faDroplet} />, bg: '#44C7FF' },
        doamkk: { title: 'Độ ẩm không khí', icon: <FontAwesomeIcon color="#1D9E67" icon={faLeaf} />, bg: '#1D9E67' },
        nhietdo: {
            title: 'Nhiệt độ',
            icon: <FontAwesomeIcon color="#F25550" icon={faTemperatureHigh} />,
            bg: '#F25550',
        },
    };

    const [unit, setUnit] = useState('');
    const [lastValue, setLastValue] = useState({ time: 'Loading...', value: '' });
    useEffect(() => {
        const getUnit = async () => {
            const raw = await getSensorInfo(sensorId);
            if (raw.EC === 0) setUnit(raw.DT.unit);
        };
        getUnit();

        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const eventSource = new EventSource(baseUrl + `/sensor/data/last/${sensorId}`);
        if (+gardenId === 1) {
            eventSource.onmessage = async (event) => {
                let eventData = JSON.parse(event.data);
                setLastValue({ time: new Date(eventData.timestamp).toLocaleString(), value: eventData.value });
            };
            eventSource.onerror = (error) => {
                console.error('EventSource failed:', error);
                eventSource.close();
            };
        }
        return () => eventSource.close();
    }, []);

    return (
        <div className="sensor-data-page position-relative bg-white pt-4 rounded-4">
            <div className="header w-100 position-absolute pt-2 d-flex justify-content-between align-items-center">
                <NavLink
                    to={`/data?gardenId=${gardenId}`}
                    className="back-btn text-decoration-none rounded ms-5 px-3 py-2"
                >
                    <FontAwesomeIcon icon={faAngleLeft} /> Trở về
                </NavLink>
                <h3
                    className="title text-center m-0 rounded-3 py-2"
                    style={{
                        backgroundColor: renderData[sensorId].bg,
                        color: ['anhsang', 'doamdat'].includes(sensorId) ? '#333' : 'white',
                    }}
                >
                    {renderData[sensorId].title}
                </h3>
                <h3 className="text-success bg-white m-0 py-2 px-3 rounded-top-3">Vườn {gardenId}</h3>
            </div>
            <div className="content row gap-4 px-5">
                <div className="col left">
                    <div className="overall d-flex justify-content-evenly mt-3">
                        <div className="icon p-2 rounded-4">{renderData[sensorId].icon}</div>
                        <div className="newest text-center">
                            <h4 className="fw-normal mt-1">Giá trị mới nhất</h4>
                            <div className="border border-dark px-2 text-center">
                                <p className="m-0">{lastValue.time}</p>
                                <p className="m-0 ms-2 fs-4 text-danger">
                                    {lastValue.value} {unit}
                                </p>
                            </div>
                        </div>
                        {/* <div className="threshold text-center mt-1">
                                <h4 className="fw-normal">Ngưỡng giá trị</h4>
                                <p className="mb-0">Trên : 200 {unit}</p>
                                <p>Dưới: 100 {unit}</p>
                            </div> */}
                    </div>
                    <div className="dashboard mt-4 pt-2">
                        <h4 className="fw-normal text-center">Biểu đồ giá trị mới nhất</h4>
                        <LiveChart gardenId={gardenId} sensorId={sensorId} limit={15} color={renderData[sensorId].bg} />
                    </div>
                </div>
                <div className="col right ps-4">
                    <h4 className="fw-normal text-center my-3 py-1">Lịch sử giá trị</h4>
                    <HistoryTable gardenId={gardenId} sensorId={sensorId} />
                </div>
            </div>
        </div>
    );
}

export default SensorData;
