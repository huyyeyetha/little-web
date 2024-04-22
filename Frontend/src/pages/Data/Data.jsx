import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getNewestData } from '../../services/webService';
import LiveClock from '../../components/LiveClock';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faDroplet, faLeaf, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import './Data.scss';

function Data() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const gardenId = searchParams.get('gardenId');
    const sampleData = [
        {
            sensorId: 'anhsang',
            title: 'Cường độ ánh sáng',
            time: 'loading...',
            value: '',
            unit: '',
            icon: <FontAwesomeIcon color="#FFF732" icon={faLightbulb} />,
        },
        {
            sensorId: 'doamdat',
            title: 'Độ ẩm đất',
            time: 'loading...',
            value: '',
            unit: '',
            icon: <FontAwesomeIcon color="#44C7FF" icon={faDroplet} />,
        },
        {
            sensorId: 'doamkk',
            title: 'Độ ẩm không khí',
            time: 'loading...',
            value: '',
            unit: '',
            icon: <FontAwesomeIcon color="#1D9E67" icon={faLeaf} />,
        },
        {
            sensorId: 'nhietdo',
            title: 'Nhiệt độ',
            time: 'loading...',
            value: '',
            unit: '',
            icon: <FontAwesomeIcon color="#F25550" icon={faTemperatureHigh} />,
        },
    ];
    const [envData, setEnvData] = useState(sampleData);
    useEffect(() => {
        let stopGetting = false;
        const getData = async () => {
            const raw = await getNewestData(gardenId);
            let data = [...sampleData];
            for (let i = 0; i < raw.length; i++) {
                data[i] = { ...data[i], time: raw[i].time, value: raw[i].value, unit: raw[i].unit };
            }
            if (!stopGetting) {
                setEnvData(data);
            }
        };
        getData();
        const intervalId = setInterval(() => getData(), 2000);
        return () => {
            clearInterval(intervalId);
            setEnvData(sampleData);
            stopGetting = true;
        };
    }, [gardenId]);

    return (
        <div className="data-page h-100 px-3 position-relative">
            <h3 className="title text-center py-3">Dữ liệu môi trường</h3>
            <div className="env-data px-3">
                {envData.map((data, index) => (
                    <div className="data-card d-flex p-3 my-2 justify-content-between rounded-4" key={index}>
                        <div className="data-info d-flex gap-4">
                            <div className="icon p-2 me-2 rounded-4">{data.icon}</div>
                            <div className="data">
                                <h4 className="title mt-2 mb-4">{data.title}</h4>
                                <p className="time d-inline fs-5">{data.time}</p>
                                <p className="value d-inline ms-5 fs-2 text-danger">
                                    {data.value} {data.unit}
                                </p>
                            </div>
                        </div>
                        <div className="align-self-center me-5">
                            <button
                                className="btn btn-outline-secondary fs-5"
                                onClick={() => navigate(`/data/${data.sensorId}?gardenId=${gardenId}`)}
                            >
                                Chi tiết
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <LiveClock className={'fs-4 text-secondary text-end mt-3 me-2'} />
        </div>
    );
}

export default Data;
