import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryCreateModal, DepartmentCreateModal } from "../../reducer/events";
import { close } from "./category-img";
import { ApiServices } from "../../services/api.get";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { check1, down } from "../admin/img";

const CreateModal = () => {
    const { departmentCreate, selectCategory } = useSelector((state) => state.events);
    const [errorMessage, setErrorMessage] = useState();
    const [departmentCreateData, setDepartmentCreatetData] = useState([]);
    const [isActive, setIsActive] = useState(false)
    const [selectName, setSelectName] = useState(null)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartmentCreatetData({
            ...departmentCreateData,
            [name]: value,
        });
    };
    const handleClose = () => {
        dispatch(DepartmentCreateModal());
        setDepartmentCreatetData(null)
        setIsActive(false);
        setSelectName(null);
        setErrorMessage(null)
    };
    const handleActive = (id) => {
        setDepartmentCreatetData({ ...departmentCreateData, categoryId: id })
        setIsActive(false)
        setSelectName(selectCategory.filter(item => item.id === id)[0].name)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                await ApiServices.postData(
                    `sub-category`,
                    departmentCreateData,
                    token
                );
                toast.success("Sub-Category successfully created!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                dispatch(DepartmentCreateModal())
                setDepartmentCreatetData(null)
                setSelectName(null)
                dispatch(CategoryCreateModal());
                setErrorMessage('')
            } catch (err) {
                console.log(err);
                setErrorMessage(err?.response?.data)
            }
        };
        fetchData();
    };
    return (
        <div>
            <Transition show={departmentCreate} as={Fragment}>
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
                                <div className="w-[400px] p-[24px]">
                                    <div className="flex justify-between items-center pb-[5px]">
                                        <h1 className="text-[18px] font-[600]">
                                            Bo’lim qo’shish
                                        </h1>
                                        <img
                                            onClick={handleClose}
                                            className="cursor-pointer w-[24px]"
                                            src={close}
                                            alt=""
                                        />
                                    </div>
                                    <p className="text-[14px] font-[400] text-[#475467] pt-[4px]">
                                        Bo’lim qo’shish uchun quyidagi ma’lumotlarni to’ldiring
                                    </p>
                                    <form className="w-[360px] flex flex-col gap-[16px] pt-[10px]">
                                        {errorMessage?.categoryId && (
                                            <motion.h1
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                            >
                                                {errorMessage?.categoryId}
                                            </motion.h1>
                                        )}
                                        <button
                                            type="button"
                                            className="relative w-full flex justify-center items-center   px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                        >
                                            <div
                                                onClick={() => setIsActive(!isActive)}
                                                className="flex justify-between items-start w-full"
                                            >
                                                <h1>{selectName ? selectName : 'Kategoryni tanlang'}</h1>
                                                <img src={down} alt="" />
                                            </div>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{
                                                    opacity: isActive ? 1 : 0,
                                                    scale: isActive ? 1 : 0,
                                                }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                                className={`absolute border-[1px] border-solid p-[4px] rounded-[8px] border-[#EAECF0] top-[60px] gap-[5px] flex flex-col justify-between w-full px-[6px] bg-[#fff] left-auto right-auto`}
                                            >
                                                {selectCategory.map((item) => (
                                                    <div
                                                        onClick={() => handleActive(item.id)}
                                                        key={crypto.randomUUID()}
                                                        className="py-[10px] px-[8px] rounded-[6px] hover:bg-[#F9FAFB] flex justify-between items-center"
                                                    >
                                                        <h1>{item.name}</h1>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </button>
                                        <div className="flex flex-col gap-[6px]">
                                            <label className="flex justify-start items-center gap-2 text-[14px] font-[500]" htmlFor="text">
                                                <h1> Bo'lim nomi (lotincha)</h1>
                                                {errorMessage?.nameL && (
                                                    <motion.h1
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                                    >
                                                        {errorMessage?.nameL}
                                                    </motion.h1>
                                                )}
                                            </label>
                                            <input
                                                className="w-full flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                type="text"
                                                name="nameL"
                                                placeholder="Nomi"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-[6px]">
                                            <label className="flex justify-start items-center gap-2 text-[14px] font-[500]" htmlFor="text">
                                                <h1>Bo'lim nomi (kirilcha)</h1>
                                                {errorMessage?.nameK && (
                                                    <motion.h1
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                                    >
                                                        {errorMessage?.nameK}
                                                    </motion.h1>
                                                )}
                                            </label>
                                            <input
                                                className="w-full flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                type="text"
                                                name="nameK"
                                                placeholder="Nomi"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className={`w-full mt-[32px] bg-[#2E90FA] text-[#fff] text-[16px] font-[600] rounded-[8px] px-[16px] py-[10px] border-[1px] border-solid border-[#1570EF]`}
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
    );
};

export default CreateModal;
