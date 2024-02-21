import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewsCreateModal } from "../../reducer/events";
import { ApiServices } from "../../services/api.get";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { close } from "../category/category-img";

const selectLeng = [
    {
        id: 1,
        title: "Uzbek",
    },
    {
        id: 2,
        title: "Русский",
    },
]

const CreateModal = () => {
    const { newsCreate } = useSelector((state) => state.events);
    const [errorMessage, setErrorMessage] = useState();
    const [selectActive, setSelectActive] = useState(false);
    const [lengSelect, setLengSelect] = useState(selectLeng)
    const [newsCreateData, setNewsCreatetData] = useState({
        "titleK": "",
        "titleL": "",
        "messageK": "",
        "messageL": ""
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {  value } = e.target;
        setNewsCreatetData({
            ...newsCreateData,
            titleL: lengSelect[0]?.title === "Uzbek" ? value : "null",
            titleK: lengSelect[0]?.title === "Русский" ? value : "null",
            messageL: lengSelect[0]?.title === "Uzbek" ? value : "null",
            messageK: lengSelect[0]?.title === "Русский" ? value : "null",
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
                toast.success("News successfully created!", {
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
    const handleSelectActive = (id) => {
        setLengSelect(selectLeng.filter(item => item.id === id));
    }
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
                                    <div onClick={() => setSelectActive(!selectActive)} className="flex justify-between items-center pb-[5px] ">
                                        {lengSelect[0]?.title === "Uzbek" ? (
                                            <h1 className="text-[18px] font-[600]">
                                                Yangilik qo’shish
                                            </h1>
                                        ) : (
                                            <h1 className="text-[18px] font-[600]">
                                                Янгилик қўшиш
                                            </h1>
                                        )}
                                        <div className="border-[1px] border-solid p-[4px] rounded-[8px] border-[#EAECF0] w-[100px] flex justify-center cursor-pointer select-leng relative">
                                            <h1 className="">{lengSelect[0]?.title}</h1>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{
                                                    opacity: selectActive ? 1 : 0,
                                                    scale: selectActive ? 1 : 0,
                                                }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                                className={`absolute border-[1px] border-solid p-[4px] rounded-[8px] border-[#EAECF0] top-[35px] gap-[5px] flex flex-col justify-between w-full px-[6px] bg-[#fff] left-auto right-auto`}
                                            >
                                                {selectLeng?.map((item) => (
                                                    <div
                                                        onClick={() => handleSelectActive(item?.id)}
                                                        key={crypto.randomUUID()}
                                                        className="py-[10px] px-[8px] rounded-[6px] hover:bg-[#F9FAFB] flex justify-between items-center"
                                                    >
                                                        <h1>{item?.title}</h1>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </div>
                                        <img
                                            onClick={handleClose}
                                            className="cursor-pointer w-[24px]"
                                            src={close}
                                            alt=""
                                        />
                                    </div>
                                    {lengSelect[0]?.title === "Uzbek" ? (
                                        <p className="text-[14px] font-[400] text-[#475467] pt-[4px]">
                                            Yangilik qo’shish uchun quyidagi ma’lumotlarni to’ldiring
                                        </p>
                                    ) : (
                                        <p className="text-[14px] font-[400] text-[#475467] pt-[4px]">
                                            Янгилик қўшиш учун quyidagi маълумотларни тўлдиринг
                                        </p>
                                    )}
                                    <form className="w-[360px] flex flex-col gap-[16px] pt-[10px]">
                                        {lengSelect[0]?.title === "Uzbek" ? (
                                            <section className="w-full">
                                                <div className="flex flex-col gap-[6px]">
                                                    <label className="flex justify-start items-center gap-2 text-[14px] font-[500] mb-2" htmlFor="text">
                                                        <h1>Yangilik nomi</h1>
                                                        {errorMessage?.titleL && (
                                                            <motion.h1
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                                            >
                                                                {errorMessage?.titleL}
                                                            </motion.h1>
                                                        )}
                                                    </label>
                                                    <input
                                                        className="mb-2 w-full flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                        type="text"
                                                        name="titleL"
                                                        placeholder="Nomi"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-[6px]">
                                                    <label className="flex justify-start items-center gap-2 text-[14px] font-[500] mb-2" htmlFor="text">
                                                        <h1>Izoh</h1>
                                                        {errorMessage?.messageL && (
                                                            <motion.h1
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                                            >
                                                                {errorMessage?.messageL}
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
                                            </section>
                                        ) : (
                                            <section className="w-full">
                                                <div className="flex flex-col gap-[6px]">
                                                    <label className="flex justify-start items-center gap-2 text-[14px] font-[500] mb-2" htmlFor="text">
                                                        <h1>Название новости</h1>
                                                        {errorMessage?.titleK && (
                                                            <motion.h1
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                                            >
                                                                {errorMessage?.titleK}
                                                            </motion.h1>
                                                        )}
                                                    </label>
                                                    <input
                                                        className="mb-2 w-full flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                        type="text"
                                                        name="titleK"
                                                        placeholder="Имя"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-[6px]">
                                                    <label className="flex justify-start items-center gap-2 text-[14px] font-[500] mb-2" htmlFor="text">
                                                        <h1>Объяснение</h1>
                                                        {errorMessage?.messageL && (
                                                            <motion.h1
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                                            >
                                                                {errorMessage?.messageK}
                                                            </motion.h1>
                                                        )}
                                                    </label>
                                                    <textarea
                                                        className="w-full h-[150px] flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                        type="text"
                                                        name="messageK"
                                                        placeholder="Напишите комментарий к новости..."
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </section>
                                        )}


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
