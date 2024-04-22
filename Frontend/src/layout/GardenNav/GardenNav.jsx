import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getAllGarden } from '../../services/webService';

import './GardenNav.scss';

function GardenNav({ children }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const gardenId = searchParams.get('gardenId');
    const location = useLocation();
    const [gardenRoutes, setGardenRoutes] = useState([]);
    useEffect(() => {
        const path = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
        const getGardens = async () => {
            let res = await getAllGarden();
            let gardens;
            if (res && res.EC === 0) {
                gardens = res.DT.map((garden) => {
                    return { path: path + `?gardenId=${garden.id}`, title: garden.name };
                });
            } else {
                gardens = [
                    { path: path + '?gardenId=1', title: 'VƯỜN 1' },
                    { path: path + '?gardenId=2', title: 'VUỜN 2' },
                    { path: path + '?gardenId=3', title: 'VUỜN 3' },
                ];
            }
            setGardenRoutes(gardens);
            if (!gardenId) {
                setSearchParams({ gardenId: gardens[0].path[gardens[0].path.length - 1] });
            }
        };
        getGardens();
    }, []);
    return (
        <div className="row garden-nav-container">
            <div className="col-2 nav mt-5 me-3 d-flex flex-column align-items-end gap-4">
                {gardenRoutes.map((route, index) => (
                    <button
                        key={index}
                        className={
                            gardenId == route.path[route.path.length - 1]
                                ? 'link fs-5 text-center text-white p-3 ps-4 active'
                                : 'link bg-white bg-opacity-75 rounded-4 py-3'
                        }
                        onClick={() => setSearchParams({ gardenId: route.path[route.path.length - 1] })}
                    >
                        {route.title}
                    </button>
                ))}
            </div>
            <div className="col content h-100 bg-white rounded-4">{children}</div>
        </div>
    );
}

export default GardenNav;
