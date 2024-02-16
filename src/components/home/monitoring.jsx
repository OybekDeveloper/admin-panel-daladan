import { Area } from '@ant-design/plots';
import React from 'react'
const Monitoring = () => {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];

    const config = {
        isStack: false,
        data: data,
        xField: "year",
        yField: "value",
        seriesField: "state",
        animation: true,
        startOnZero: false,
        smooth: true,
        legend: { offsetY: -6 },
        areaStyle: (datum) => {
            const won = "l(270) 0:#ffffff 0.5:#b7eb8f 1:#52c41a";
            const lost = "l(270) 0:#ffffff 0.5:#f3b7c2 1:#ff4d4f";
            return { fill: datum.state === "Won" ? won : lost };
        },
        color: (datum) => (datum.state === "Won" ? "#52C41A" : "#F5222D"),
    };
    return (

        <div className='h-full'>
            <Area {...config} height={500} />
        </div>
    )
}

export default Monitoring