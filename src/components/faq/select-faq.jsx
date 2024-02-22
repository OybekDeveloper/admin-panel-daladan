import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../category/category-img";
import { ShowSelectFaq } from "../../reducer/events";

const SelectFaq = () => {
    const { openSelectFaq, selectFaq } = useSelector((state) => state.events);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(ShowSelectFaq());
    };
    return (
        <div>
            <Transition show={openSelectFaq} as={Fragment}>
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
                            <Dialog.Panel className="max-h-[80%] overflow-y-auto rounded-[12px] bg-[#fff] shadow-modal scrollbar-hide">
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
                                    <div className="flex flex-col">
                                        <h1 className="text-balance text-[20px] text-[#101828] font-[500]">{selectFaq?.question}</h1>
                                        <p className="text-balance font-[400] text-[#475467] text-[16px] pt-[16px]">{selectFaq?.answer}</p>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    );
};

export default SelectFaq;
