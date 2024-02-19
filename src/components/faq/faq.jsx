import React, { useEffect, useState } from 'react'
import { plus } from '../banner/banner-img'
import { ApiServices } from '../../services/api.get'
import FaqItem from './faq-item'
import './faq.scss'
import SelectFaq from './select-faq'
import { useDispatch, useSelector } from 'react-redux'
import { FaqCreateModal } from '../../reducer/events'
import CreateModal from './create-modal'
import DeleteModal from './delete-modal'
import EditModal from './edit-modal'
const FAQ = () => {
    const { faqCreate, faqDel } = useSelector(state => state.events)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);

    const [faq, setFaq] = useState([]);
    const handleCreateFaq = () => {
        dispatch(FaqCreateModal())
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await ApiServices.getData('faq/all', token)
                console.log(response)
                setFaq(response)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false); // Set loading to false after data is received (or if there's an error)
            }

        }
        fetchData()
    }, [faqCreate, faqDel])
    
    return (
        <div className="faq px-[24px] py-[32px] w-full">
            <section className="flex justify-between items-center">
                <h1 className="text-[24px] font-[500]">Ko’p beriladigan savollar</h1>
                <div onClick={handleCreateFaq} className="add-faq flex justify-center items-center gap-[6px] px-[14px] py-[10px] cursor-pointer">
                    <img src={plus} alt="addadmin" />
                    <h1 className="text-[14px] font-[600]">Qo’shish</h1>
                </div>
            </section>
            <div className="h-[1px] bg-[#EAECF0] my-[15px]"></div>
            <section className='grid grid-cols-3 gap-x-[32px] gap-y-[64px] pt-[16px] mb-[50px]'>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    faq.slice().reverse().map(item => (
                        <FaqItem key={item.id} faq={item} />
                    ))
                )}
            </section>
            <CreateModal />
            <SelectFaq />
            <DeleteModal />
            {/* <EditModal/> */}
        </div>
    )
}

export default FAQ