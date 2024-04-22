import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateThresholdOfGarden } from '../../../services/thesholdService';

function ModalEditThreshold(prop) {
    const [show, setShow] = useState(false);
    const [upperBound, setUpperBound] = useState(prop.objectSetting.currUpper);
    const [lowerBound, setLowerBound] = useState(prop.objectSetting.currLower);

    const [isMin, setIsMin] = useState(true);
    const [isMax, setIsMax] = useState(true);
    const [minMaxConstraint, setMinMaxConstraint] = useState(true);
    const [isEmptyInput, setIsEmptyInput] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const existTitle = {
        anhsang: 'Ánh sáng',
        doamkk: 'Độ ẩm không khí',
        doamdat: 'Độ ẩm đất',
        nhietdo: 'Nhiệt độ',
    };

    const isSensorIdValid = existTitle[prop.objectSetting.sensorId] !== undefined ? true : false;

    const checkConstraints = () => {
        // // Xử lý khi người dùng lưu dữ liệu

        if (upperBound === '' || lowerBound === '') {
            setIsEmptyInput(true); // Nếu upperBound hoặc lowerBound rỗng, set isEmptyInput thành true
            return;
        } else {
            setIsEmptyInput(false); // Nếu upperBound và lowerBound không rỗng, set isEmptyInput thành false
        }

        if (parseInt(upperBound) <= parseInt(lowerBound)) {
            // alert('Giá trị cận trên phải lớn hơn giá trị cận dưới!');
            setMinMaxConstraint(false);
        } else {
            setMinMaxConstraint(true);
        }

        if (parseInt(upperBound) > prop.objectSetting.max) {
            // alert(`Giá trị cận trên vượt quá mức quy định (${prop.objectSetting.max})`);
            setIsMax(false);
        } else {
            setIsMax(true);
        }

        if (parseInt(lowerBound) < prop.objectSetting.min) {
            // alert(`Giá trị cận dưới thấp hơn mức quy định (${prop.objectSetting.min})`);
            setIsMin(false);
        } else {
            setIsMin(true);
        }
    };

    useEffect(checkConstraints, [upperBound, lowerBound]);

    const handleSave = async () => {
        // console.log(isMax && isMin && minMaxConstraint && false)
        // console.log(isMax && isMin && minMaxConstraint)
        if (isMax && isMin && minMaxConstraint && !isEmptyInput) {
            let newUpper = upperBound != prop.objectSetting.currUpper ? upperBound : null;
            let newLower = lowerBound != prop.objectSetting.currLower ? lowerBound : null;

            if (newUpper != null || newLower != null) {
                try {
                    const response = await updateThresholdOfGarden(
                        prop.objectSetting.gardenId,
                        prop.objectSetting.sensorId,
                        newUpper,
                        newLower,
                    );

                    if (response === null) {
                        console.error('GardenId không hợp lệ.');
                    } else {
                        console.log('Cập nhật ngưỡng ánh sáng thành công!');
                    }
                } catch (err) {
                    console.error('Đã xảy ra lỗi khi cập nhật ngưỡng ánh sáng:', err);
                }

                console.log(prop.toggleEditValue);

                if (prop.toggleEditValue == false) {
                    prop.setToggleEditValue(true);
                } else {
                    prop.setToggleEditValue(false);
                }
                console.log(prop.toggleEditValue);
            }

            handleClose();
        }
    };

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Chỉnh sửa
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Chỉnh sửa ngưỡng: {isSensorIdValid ? existTitle[prop.objectSetting.id] : 'SensorId error!!!'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Ô nhập số liệu */}
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="text-danger fs-5">
                            {isEmptyInput && <div>Không được bỏ trống trường thông tin!</div>}
                            {!minMaxConstraint && <div>Giá trị cận trên phải lớn hơn giá trị cận dưới!</div>}
                            {!isMax && <div>Giá trị cận trên vượt quá mức quy định ({prop.objectSetting.max})</div>}
                            {!isMin && <div>Giá trị cận dưới thấp hơn mức quy định ({prop.objectSetting.min})</div>}
                        </div>
                        <div className="form-edit d-flex flex-row justify-content-center align-items-center">
                            <div className="label-part d-flex flex-column justify-content-center align-items-center">
                                <label htmlFor="upper-bound" className="m-2 fs-4">
                                    Cận trên:
                                </label>
                                <label htmlFor="lower-bound" className="m-2 fs-4">
                                    Cận dưới:
                                </label>
                            </div>

                            <div className="input-part d-flex flex-column fs-4 justify-content-center align-items-center">
                                {/* <input
                                    className="border m-2"
                                    id="upper-bound"
                                    type="text"
                                    pattern="[\+\-]?[1-9][0-9]*|0"
                                    value={upperBound}
                                    onChange={(e) => {
                                        setUpperBound(e.target.value);
                                        console.log(parseInt(upperBound))
                                    }}
                                /> */}

                                <input
                                    className="border m-2"
                                    id="upper-bound"
                                    type="text"
                                    value={upperBound}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        if (/^0$|^-?[1-9][0-9]*$|^$/.test(inputValue)) {
                                            // Kiểm tra nếu giá trị chỉ chứa số nguyên
                                            setUpperBound(inputValue); // Cập nhật giá trị
                                            // console.log(parseInt(upperBound));
                                        }
                                    }}
                                />

                                {/* <input
                                    className="border m-2"
                                    id="lower-bound"
                                    type="text"
                                    pattern="[\+\-]?[1-9][0-9]*|0"
                                    value={lowerBound}
                                    onChange={(e) => {
                                        setLowerBound(e.target.value);
                                        console.log(parseInt(lowerBound));
                                    }}
                                /> */}

                                <input
                                    className="border m-2"
                                    id="lower-bound"
                                    type="text"
                                    value={lowerBound}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        if (/^-?\d*$/.test(inputValue)) {
                                            // Kiểm tra nếu giá trị chỉ chứa số nguyên
                                            setLowerBound(inputValue); // Cập nhật giá trị
                                            // console.log(parseInt(lowerBound));
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Huỷ
                    </Button>

                    <Button variant="primary" onClick={handleSave} disabled={!isSensorIdValid}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditThreshold;
