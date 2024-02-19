import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { menu } from './faq-img';
import { FaqDeleteModal, FaqEditModal, ShowSelectFaq } from '../../reducer/events';
import { useDispatch, useSelector } from 'react-redux';
import { edit, trash } from '../category/category-img';
const FaqItem = ({ faq }) => {
    const dispatch = useDispatch()
    const { faqDel, faqCreate, faqEdit } = useSelector(state => state.events)
    const [isActive, setIsActive] = useState(false);
    const handleShowFaq = (item) => {
        dispatch(ShowSelectFaq(item))
    }
    useEffect(() => {
        setIsActive(false)
    }, [faqDel, faqCreate, faqEdit])
    const handleFaqDelete = (id) => {
        dispatch(FaqDeleteModal(id))
    }
    const handleEditFaq = (id,item) => {
        dispatch(FaqEditModal([id,item]))
    }
    const handleActive = () => {
        setIsActive(!isActive)
    }
    return (
        <div className='relative justify-start w-full faq-card flex flex-col items-start gap-[8px]'>
            <div className='w-full flex justify-between items-start  gap-[8px]'>
                <h1 className='text-[18px] font-[500]'>{faq?.question.length > 50 ? `${faq?.question.slice(0, 50)}...` : faq?.question}</h1>
                <img onClick={handleActive} className='w-[24px] h-[24px]' src={menu} alt="" />
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
                    className='w-[150px] flex flex-col justify-center items-center bg-[#FFF] rounded-[12px] absolute right-4 top-4 p-[10px] border-[1px] border-solid border-[#EAECF0]'>
                    <div onClick={()=>handleEditFaq(faq?.id,faq)} className='cursor-pointer flex gap-[8px] p-[10px]'>
                        <img src={edit} alt="edit" />
                        <h1 className='whitespace-normal  text-[16px] font-[500] text-[#101828]'>Tahrirlash</h1>
                    </div>
                    <div onClick={() => handleFaqDelete(faq?.id)} className='cursor-pointer flex gap-[8px] p-[10px]'>
                        <img src={trash} alt="edit" />
                        <h1 className='whitespace-normal  text-[16px] font-[500] text-[#101828]'>O’chirish</h1>
                    </div>
                </motion.div>
            </div>
            <p className='text-[16px] font-[400] text-[#475467]'>{faq?.answer.length > 350 ? `${faq?.answer.slice(0, 350)}...` : faq?.answer}</p>
            <button onClick={() => handleShowFaq(faq)} className="bottom-[-40px] absolute  faq-btn w-full h-[30px] rounded-[12px] mt-[10px] bg-[#eff0f1] hover:bg-[#ecedee]">
                Batafsil
            </button>
        </div>
    )
}

export default FaqItem