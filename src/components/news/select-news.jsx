import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../category/category-img";
import { ShowSelectNews } from "../../reducer/events";

const SelectNews = () => {
    const { openAllNews, selectNews } = useSelector((state) => state.events);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(ShowSelectNews());
    };
    return (
        <div>
            <Transition show={openAllNews} as={Fragment}>
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
                                    <div className="w-full flex justify-between mb-[10px]">
                                        <h1 className="w-full text-[18px] font-[600]">
                                            Batafsil ma'lumot
                                        </h1>
                                        <img
                                            onClick={handleClose}
                                            className="cursor-pointer w-[24px]"
                                            src={close}
                                            alt=""
                                        />

                                    </div>
                                    <h1 className="text-balance text-[20px] text-[#101828] font-[500]">{selectNews[0]?.title}</h1>
                                    <p className="text-balance font-[400] text-[#475467] text-[16px] pt-[16px]">{selectNews[0]?.message}</p>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    );
};

export default SelectNews;
