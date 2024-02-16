import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryEditModal } from '../../reducer/events'
import { close, upload } from './category-img'
const EditModal = () => {

    const { categoryEdit } = useSelector(state => state.events)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(CategoryEditModal())
    }
    useEffect(() => {
        const body = document.querySelector(".app");
        if (categoryEdit) {
            body.classList.add("blur-effect");
        } else {
            body.classList.remove("blur-effect");
        }
    }, [categoryEdit]);
    return (
        <div>
            <Transition show={categoryEdit} as={Fragment}>
                <Dialog onClose={handleClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed opacity-[0.8] backdrop-blur-10 bg-[#0C111D] inset-0 " />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="fixed inset-0 flex justify-center items-center">
                            <Dialog.Panel className=" rounded-[12px] bg-[#fff] shadow-modal">
                                <div className='w-[400px] p-[24px]'>
                                    <div className='flex justify-between items-center pb-[5px]'>
                                        <h1 className='text-[18px] font-[600]'>Kategoriyani tahrirlash</h1>
                                        <img onClick={handleClose} className='cursor-pointer w-[24px]' src={close} alt="" />
                                    </div>
                                    <p className='text-[14px] font-[400] text-[#475467] pt-[4px]'>Kategoriya tahrirlash uchun quyidagi ma’lumotlarni to’ldiring</p>
                                    <form className="w-[360px] flex flex-col gap-[16px] pt-[10px]">
                                        <div className="flex flex-col gap-[6px]">
                                            <label className="text-[14px] font-[500]" htmlFor="text">
                                                Kategoriya nomi (lotincha)
                                            </label>
                                            <input
                                                className="w-full flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                type="text"
                                                name="fullName"
                                                placeholder="Nomi"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-[6px]">
                                            <label className="text-[14px] font-[500]" htmlFor="text">
                                                Kategoriya nomi (kirilcha)
                                            </label>
                                            <input
                                                className="w-full flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                type="text"
                                                name="fullName"
                                                placeholder="Nomi"
                                            />
                                        </div>
                                        <div className='border-solid border-[1px] border-[#EAECF0] rounded-[12px] p-[24px] flex justify-center items-center flex-col'>
                                            <input type="file" name='file' hidden className='file-input' />
                                            <div className='icon pb-[12px]'>
                                                <img className=' p-[10px] rounded-[8px] border-solid border-[1px] border-[#EAECF0]' src={upload} alt="upload" />
                                            </div>
                                            <p className='text-[#1570EF] text-[14px] font-[600] pb-[4px]'>Rasm yuklang</p>
                                            <p className='text-[12px] font-[400] text-[#475467]'>PNG, JPG  (max. 345x180px)</p>
                                            <section>

                                            </section>
                                        </div>

                                        <button
                                            className="w-full mt-[32px] bg-[#2E90FA] text-[#fff] text-[16px] font-[600] rounded-[8px] px-[16px] py-[10px] border-[1px] border-solid border-[#1570EF]"
                                        >
                                            Saqlash
                                        </button>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    )
}

export default EditModal