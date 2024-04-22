import { useEffect, useState } from 'react';

function LiveClock({ className }) {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timerID = setInterval(() => setDate(new Date()), 1000);
        return () => {
            clearInterval(timerID);
        };
    }, []);
    return (
        <h4 className={className}>
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </h4>
    );
}

export default LiveClock;
