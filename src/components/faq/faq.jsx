import React, { useEffect, useState } from 'react'
import { plus } from '../banner/banner-img'
import { ApiServices } from '../../services/api.get'
import FaqItem from './faq-item'
import './faq.scss'
const FAQ = () => {
    const [faq, setFaq] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await ApiServices.getData('faq/all', token)
                console.log(response)
                setFaq(response)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    return (
        <div className="faq px-[24px] py-[32px] w-full">
            <section className="flex justify-between items-center">
                <h1 className="text-[24px] font-[500]">Ko’p beriladigan savollar</h1>
                <div className="add-faq flex justify-center items-center gap-[6px] px-[14px] py-[10px] cursor-pointer">
                    <img src={plus} alt="addadmin" />
                    <h1 className="text-[14px] font-[600]">Qo’shish</h1>
                </div>
            </section>
            <div className="h-[1px] bg-[#EAECF0] my-[15px]"></div>
            <section className='grid grid-cols-3 gap-x-[32px] gap-y-[64px] pt-[16px] mb-[50px]'>
                {faq.slice().reverse().map(item => (
                    <FaqItem faq={item} />
                ))}
            </section>
        </div>
    )
}

export default FAQ