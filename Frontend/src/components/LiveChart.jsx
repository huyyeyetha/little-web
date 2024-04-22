import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

function LiveChart({ gardenId, sensorId, limit, color }) {
    const [dataChart, setDataChart] = useState({ time: [], value: [] });

    const data = {
        labels: dataChart.time,
        datasets: [
            {
                data: dataChart.value,
                fill: false,
                borderColor: color,
                lineTension: 0.25,
            },
        ],
    };
    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const eventSource = new EventSource(baseUrl + `/sensor/data/chart/${sensorId}?limit=${limit}`);

        if (+gardenId === 1) {
            eventSource.onmessage = async (event) => {
                let eventData = JSON.parse(event.data);
                let time = eventData.time.map((t) => (t ? new Date(t).toLocaleTimeString() : ''));
                setDataChart({ time: time, value: eventData.value });
            };
            eventSource.onerror = (error) => {
                console.error('EventSource failed:', error);
                eventSource.close();
            };
        }
        return () => eventSource.close();
    }, []);

    return <Line data={data} options={options} height={170} />;
}

export default LiveChart;
