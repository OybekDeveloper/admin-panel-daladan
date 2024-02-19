import React, { useEffect, useState } from 'react'
import './banner.scss'
import { plus, trashb } from './banner-img'
import { ApiServices } from '../../services/api.get'
import { useDispatch, useSelector } from 'react-redux'
import { BannerCreateModal, BannerDeleteModal } from '../../reducer/events'
import CreateModal from './create-modal'
import DeleteModal from './delete-modal'
const Banner = () => {
    const { bannerCreate, bannerDel } = useSelector(state => state.events)
    const dispatch = useDispatch()
    const [banner, setBanner] = useState([]);
    const handleCreateBanner = () => {
        dispatch(BannerCreateModal())
    }
    const handleDeleteBanner = (id) => {
        dispatch(BannerDeleteModal(id))
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await ApiServices.getData('banner/all', token)
                setBanner(response)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [bannerCreate, bannerDel])
    console.log(banner)
    return (
        <div className="banner px-[24px] py-[32px] w-full">
            <section className="flex justify-between items-center">
                <h1 className="text-[24px] font-[500]">Banner</h1>
                <div onClick={handleCreateBanner} className="add-banner flex justify-center items-center gap-[6px] px-[14px] py-[10px] cursor-pointer">
                    <img src={plus} alt="addadmin" />
                    <h1 className="text-[14px] font-[600]">Qo’shish</h1>
                </div>
            </section>
            <div className="h-[1px] bg-[#EAECF0] my-[15px]"></div>
            <section className='grid grid-cols-3 gap-[16px]'>
                {banner.slice().reverse().map(item => (
                    <div key={item?.id} className='banner-card flex flex-col justify-between'>
                        <img className='object-cover h-[200px] rounded-t-[16px]' src={item?.imageUrl} alt="" />
                        <div className='px-[20px] py-[24px] flex flex-col gap-[24px]'>
                            <h1 className='whitespace-normal overflow-hidden text-[#475467] text-[16px] font-[400]'>{item?.url}</h1>
                            <button onClick={() => handleDeleteBanner(item?.id)} className='w-full flex justify-center gap-[4px] items-center px-[12px] py-[8px] banner-btn'>
                                <img className='w-[20px] h-[20px]' src={trashb} alt="trashb" />
                                <h1 className='text-[14px] font-[600] text-[#fff]'>O’chirish</h1>
                            </button>
                        </div>
                    </div>
                ))}
            </section>
            <CreateModal />
            <DeleteModal />
        </div>
    )
}

export default Banner