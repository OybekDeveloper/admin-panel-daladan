import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryCreateModal, DepartmentCreateModal, NewsCreateModal } from "../../reducer/events";
import { ApiServices } from "../../services/api.get";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { check1, down } from "../admin/img";
import { close } from "../category/category-img";

const CreateModal = () => {
    const { newsCreate } = useSelector((state) => state.events);
    const [errorMessage, setErrorMessage] = useState();
    const [newsCreateData, setNewsCreatetData] = useState({
        "titleK": "",
        "titleL": "",
        "messageK": "",
        "messageL": ""
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewsCreatetData({
            ...newsCreateData,
            [name]: value,
            titleK: 'null',
            messageK: "null"
        });
    };
    const handleClose = () => {
        dispatch(NewsCreateModal());
        setNewsCreatetData({
            "titleK": "",
            "titleL": "",
            "messageK": "",
            "messageL": ""
        })
        setErrorMessage(null)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                await ApiServices.postData(
                    `news`,
                    newsCreateData,
                    token
                );
                toast.success("Newa successfully created!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                dispatch(NewsCreateModal())
                setNewsCreatetData({
                    "titleK": "",
                    "titleL": "",
                    "messageK": "",
                    "messageL": ""
                })
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
            <Transition show={newsCreate} as={Fragment}>
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
                                            Yangilik qo’shish
                                        </h1>
                                        <img
                                            onClick={handleClose}
                                            className="cursor-pointer w-[24px]"
                                            src={close}
                                            alt=""
                                        />
                                    </div>
                                    <p className="text-[14px] font-[400] text-[#475467] pt-[4px]">
                                        Yangilik qo’shish uchun quyidagi ma’lumotlarni to’ldiring
                                    </p>
                                    <form className="w-[360px] flex flex-col gap-[16px] pt-[10px]">
                                        <div className="flex flex-col gap-[6px]">
                                            <label className="flex justify-start items-center gap-2 text-[14px] font-[500]" htmlFor="text">
                                                <h1>Yangilik nomi</h1>
                                                {errorMessage?.titleL && (
                                                    <motion.h1
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                                    >
                                                        Name must not be blank
                                                    </motion.h1>
                                                )}
                                            </label>
                                            <input
                                                className="w-full flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                type="text"
                                                name="titleL"
                                                placeholder="Nomi"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-[6px]">
                                            <label className="flex justify-start items-center gap-2 text-[14px] font-[500]" htmlFor="text">
                                                <h1>Izoh</h1>
                                                {errorMessage?.messageL && (
                                                    <motion.h1
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                                    >
                                                        Message must not be blank
                                                    </motion.h1>
                                                )}
                                            </label>
                                            <textarea
                                                className="w-full h-[150px] flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                type="text"
                                                name="messageL"
                                                placeholder="Yangilik haqida izoh yozing..."
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
