import { Area } from '@ant-design/plots';
import React, { useEffect, useState } from 'react'
import { ApiServices } from '../../services/api.get';
import Loader from '../loader/loader';
const Monitoring = ({ getData }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await ApiServices.postData('products/statistics', getData, token)
                setData(response)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [getData])

    const config = {
        isStack: false,
        data: data,
        xField: "dateInterval",
        yField: "productCount",
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
            {loading ? <Loader /> : <Area {...config} height={500} />}
        </div>
    )
}

export default Monitoring