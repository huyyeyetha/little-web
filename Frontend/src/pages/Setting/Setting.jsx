import './Setting.scss';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Setting() {
    const navigate = useNavigate();

    const handleThresholdValuesClick = () => {
        navigate('/setting/threshold-setting?gardenId=1'); // "threshold-values"
    };

    const handleAccountSettingsClick = () => {
        navigate('/setting/account-settings'); // "account-settings"
    };

    return (
        <div className="setting-page position-relative h-100 px-5 bg-white rounded-4">
            <h3 className="title text-center py-3">Cài đặt</h3>
            <div className="w-100 h-75 d-flex flex-column justify-content-center align-items-center">
                <button className="FeatureBox" onClick={() => handleThresholdValuesClick()}>
                    Cài đặt giá trị ngưỡng
                </button>
                <button className="FeatureBox" onClick={() => handleAccountSettingsClick()}>
                    Cài đặt tài khoản
                </button>
            </div>
        </div>
    );
}

export default Setting;
