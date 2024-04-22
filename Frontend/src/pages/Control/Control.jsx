import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getdvcondition, changedevice, changeappliedThreshold, getdvappliedThreshold } from '../../services/deviceService';

import { BsToggleOff, BsToggleOn } from 'react-icons/bs';

import bulb from '../../assets/bulb.svg';
import pump from '../../assets/pump.png';
import './Control.scss';

function Control() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const gardenId = searchParams.get('gardenId');
    const dvData = [
        {
            dvId: 'den',
            title: 'đèn',
            condition: 0,
            threshold: 0,
            icon: bulb,
            value: '0',
            total: '3',
        },
        {
            dvId: 'maybom',
            title: 'máy bơm',
            condition: 0,
            threshold: 0,
            icon: pump,
            value: '0',
            total: '3',
        },
    ];
    const [envData, setEnvData] = useState(dvData);
    useEffect(() => {
        const dv = ['den', 'maybom'];
        let stopGetting = false;
        const getData = async () => {
            let data = [...dvData];
            for (let i = 0; i < dv.length; i++) {
                const raw = await getdvcondition(gardenId, dv[i]);
                const raw2 = await getdvappliedThreshold(gardenId, dv[i]);
                data[i] = { ...data[i], time: raw.time, condition: raw.value, threshold: raw2};
            }
            if (!stopGetting) {
                setEnvData(data);
            }
        };
        getData();
        const intervalId = setInterval(() => getData(), 2000);
        return () => {
            clearInterval(intervalId);
            setEnvData(dvData);
            stopGetting = true;
        };
    }, [gardenId]);

    const handleClick1 = (index) => {
        const updatedEnvData = [...envData];
        updatedEnvData[index].condition = 1 - updatedEnvData[index].condition;
        const s = async () => {
            const a = await changedevice(updatedEnvData[index].dvId, updatedEnvData[index].condition);
        };
        s();
        setEnvData(updatedEnvData);
    };

    const handleClick2 = (index) => {
        const updatedEnvData = [...envData];
        updatedEnvData[index].threshold = 1 - updatedEnvData[index].threshold;
        const s = async () => {
            const a = await changeappliedThreshold(updatedEnvData[index].dvId, updatedEnvData[index].threshold);
        };
        s();
        setEnvData(updatedEnvData);
    };

    return (
        <div className="control-page h-100 px-3 position-relative">
            <h3 className="title fw-normal text-center py-3">Cài đặt lịch trình</h3>
            <div className="env-control px-3">
                {envData.map((data, index) => (
                    <div key={index}>
                        <div className="control-bulb-card d-flex my-2 justify-content-between rounded-4">
                            <div className="bulb p-2">
                                <div className="icon p-2 rounded-4">
                                    <img className="default-layout" src={data.icon} alt={data.title} />

                                    <h4 className="title">{data.title}</h4>
                                </div>
                                {data.dvId === 'den' && (
                                    <div className="bulb-set">
                                        <h5 className="title mt-1 mb-1">Cài đặt {data.title}</h5>
                                    </div>
                                )}
                            </div>

                            <div className="data ps-3">
                                <div className="title line-bt1">
                                    <div className="s">
                                        Trạng thái: {data.condition === 1 ? 'đang bật' : 'đang tắt'}
                                    </div>
                                    <div key={index} className="o" onClick={() => handleClick1(index)}>
                                        {data.condition === 1 ? (
                                            <BsToggleOn className="toggle" color="green" />
                                        ) : (
                                            <BsToggleOff className="toggle" color="red" />
                                        )}
                                    </div>
                                </div>
                                <div className="title line-bt1">
                                    <div className="s">
                                        Tự động bật {data.title} khi dưới ngưỡng: {data.threshold === 1 ? 'bật' : 'tắt'}
                                    </div>
                                    <div key={index} className="o" onClick={() => handleClick2(index)}>
                                        {data.threshold === 1 ? (
                                            <BsToggleOn className="toggle" color="green" />
                                        ) : (
                                            <BsToggleOff className="toggle" color="red" />
                                        )}
                                    </div>
                                </div>
                                <div className="title">
                                    <div className="s">
                                        Lịch trình: {data.value}/{data.total}
                                    </div>
                                    <div className="t m-md-3 d-flex align-items-center justify-content-center">
                                        Thiết lập
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Control;
