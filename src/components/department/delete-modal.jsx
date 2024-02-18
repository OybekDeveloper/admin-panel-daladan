import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DepartmentDeleteModal } from '../../reducer/events'
import { close, line, trashIcon } from './department-img'
import { ApiServices } from '../../services/api.get'
import { toast } from 'react-toastify'
const DeleteModal = () => {

    const { departmentDel, deleteDepartmentId } = useSelector(state => state.events)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(DepartmentDeleteModal())
    }
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await ApiServices.delData(`sub-category/${deleteDepartmentId}`, token);
            dispatch(DepartmentDeleteModal())
            toast.error("Department successfully deleted!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <Transition show={departmentDel} as={Fragment}>
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
                                <div className='w-[400px] p-[16px] overflow-hidden'>
                                    <div className="relative w-full icons flex justify-between items-center">
                                        <img className='w-[250px] absolute left-[-100px]' src={line} alt="line" />
                                        <img className=' p-[12px]' src={trashIcon} alt="trash icon" />
                                        <img onClick={handleClose} className='cursor-pointer p-[12px]' src={close} alt="close" />
                                    </div>
                                    <h1 className='text-[18px] font-[600] pt-[16px]'>Bo'limni o’chirish</h1>
                                    <p className='text-[14px] font-[400] text-[#475467] pt-[4px]'>“Dehqonchilik” kategoriyasini o’chirishni xohlaysizmi?</p>
                                    <div className='w-full flex justify-around items-center gap-[12px] pt-[32px]'>
                                        <button onClick={handleClose} className='w-[170px] text-[16px] font-[600] rounded-[8px] border-solid border-[1px] border-[#D0D5DD] bg-[#fff] px-[16px] py-[10px]'>Bekor qilish</button>
                                        <button onClick={handleDelete} className='w-[170px] text-[16px] font-[600] rounded-[8px] border-solid border-[1px] bg-[#D92D20] px-[16px] py-[10px] text-[#fff]'>O’chirish</button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    )
}

export default DeleteModal