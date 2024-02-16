import React, { Fragment, useEffect, useState } from "react";
import { addadmin, check1, down, xicon } from "./img";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import "./admin.scss";
import { ApiServices } from "../../services/api.get";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Admin = () => {
    const [allAdmin, setAllAdmin] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { pathname } = useLocation();
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        password: "",
        role: "",
    });
    const [people, setPeople] = useState([
        { name: "Admin", check: false, role: "ROLE_ADMIN" },
        { name: "Moderator", check: false, role: "ROLE_MODERATOR" },
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(people);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const body = document.querySelector(".app");
        if (isOpen) {
            body.classList.add("blur-effect");
        } else {
            body.classList.remove("blur-effect");
        }
    }, [isOpen]);
    const handleClose = () => {
        setFormData({
            fullName: "",
            phone: "",
            password: "",
            role: "",
        });
        setPeople([
            { name: "Admin", check: false, role: "ROLE_ADMIN" },
            { name: "Moderator", check: false, role: "ROLE_MODERATOR" },
        ])
        setIsOpen(false);
        setErrorMessage("");
    }
    const handleActive = (name) => {
        setIsActive(!isActive);
        setSelected(people.filter((item) => item.name === name));
        console.log(selected);
        const updatedPeople = people.map((item) => ({
            ...item,
            check: item.name === name,
        }));
        setPeople(updatedPeople);
        const selectedRole = updatedPeople.find((item) => item.name === name);
        setFormData({
            ...formData,
            role: selectedRole.role,
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await ApiServices.postData(
                    "admin/create",
                    formData,
                    token
                );
                if (response.status) {
                    setIsOpen(false);
                    setFormData({
                        fullName: "",
                        phone: "",
                        password: "",
                        role: "",
                    });
                    setPeople([
                        { name: "Admin", check: false, role: "ROLE_ADMIN" },
                        { name: "Moderator", check: false, role: "ROLE_MODERATOR" },
                    ])
                    toast.success("Admin added successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            } catch (err) {
                console.log(err);
                setErrorMessage(err?.response);
                console.log(errorMessage);

            }

        }
        fetchData()
    };
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            try {
                const data = await ApiServices.getData("admin/all", token);
                setAllAdmin(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [isOpen, pathname]);
    console.log(formData)
    return (
        <div className="admin px-[24px] py-[32px] w-full">
            <section className="flex justify-between items-center">
                <h1 className="text-[24px] font-[500]">Admin</h1>
                <div
                    onClick={() => setIsOpen(true)}
                    className="add-admin flex justify-center items-center gap-[6px] px-[14px] py-[10px]"
                >
                    <img src={addadmin} alt="addadmin" />
                    <h1 className="text-[14px] font-[600]">Admin qo’shish</h1>
                </div>
            </section>
            <div className="h-[1px] bg-[#EAECF0] my-[15px]"></div>
            <section className="admin-list w-full">
                <h1 className="text-[18px] font-[600] px-[24px] py-[20px]">
                    Adminlar ro’yxati
                </h1>
                <table className="min-w-full">
                    <thead>
                        <tr className="border-t">
                            <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                Familiya, Ism
                            </th>
                            <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                Role
                            </th>
                            <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                Telefon raqami
                            </th>
                        </tr>
                    </thead>
                    <tbody className="w-full whitespace-nowrap overflow-y-auto">
                        {allAdmin?.map((item, idx) => (
                            <tr
                                key={item?.id}
                                className={`border-t ${idx % 2 === 0 && "bg-[#F9FAFB]"}`}
                            >
                                <td className="text-[14px] font-[500] text-[#101828] py-[16px] px-[24px]">
                                    {item?.fullName}
                                </td>
                                <td className="text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                    {item?.role}
                                </td>
                                <td className="text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                    {item?.phone}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <Transition show={isOpen} as={Fragment}>
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
                                <div className="p-[24px] flex flex-col items-start">
                                    <div className="w-full flex justify-between items-center">
                                        <h1 className="text-[18px] font-[600]">Admin qo’shish</h1>
                                        <img
                                            onClick={handleClose}
                                            className="w-[24px] h-[24px] cursor-pointer"
                                            src={xicon}
                                            alt="icon"
                                        />
                                    </div>
                                    {errorMessage?.data?.phone && (
                                        <motion.h1
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full bg-red-200 rounded-[12px] p-[5px] mt-[10px]">
                                            {errorMessage?.data?.phone}
                                        </motion.h1>
                                    )}
                                    {errorMessage?.data?.fullName && (
                                        <motion.h1
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full bg-red-200 rounded-[12px] p-[5px] mt-[10px]">
                                            {errorMessage?.data?.fullName}
                                        </motion.h1>
                                    )}
                                    {errorMessage?.data?.password && (
                                        <motion.h1
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full bg-red-200 rounded-[12px] p-[5px] mt-[10px]">
                                            {errorMessage?.data?.password}
                                        </motion.h1>
                                    )}
                                    {errorMessage?.status === 403 && (
                                        <motion.h1
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full bg-red-200 rounded-[12px] p-[5px] mt-[10px]">
                                            You have not selected a role!
                                        </motion.h1>
                                    )}
                                    {errorMessage?.data?.errorMessage && (
                                        <motion.h1
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full bg-red-200 rounded-[12px] p-[5px] mt-[10px]">
                                            {errorMessage?.data?.errorMessage}
                                        </motion.h1>
                                    )}
                                    <form className="w-[360px] flex flex-col gap-[20px] pt-[10px]">
                                        <div className="flex flex-col gap-[6px]">
                                            <label className="text-[14px] font-[500]" htmlFor="text">
                                                Familiya, Ism*
                                            </label>
                                            <input
                                                className="w-full flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                type="text"
                                                name="fullName"
                                                placeholder="Familiya, Ism kiriting"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col items-start gap-[6px]">
                                            <label className="text-[14px] font-[500]" htmlFor="text">
                                                Telefon raqam*
                                            </label>
                                            <input
                                                className="w-full flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                type="text"
                                                placeholder="+998 (88) 123 45 67"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col items-start gap-[6px]">
                                            <label className="text-[14px] font-[500]" htmlFor="password">
                                                Password*
                                            </label>
                                            <input
                                                className="w-full flex px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                                type="password"
                                                placeholder="Enter Password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col items-start gap-[6px]">
                                            <label className="text-[14px] font-[500]" htmlFor="text">
                                                Role*
                                            </label>
                                            <button
                                                type="button"
                                                className="relative w-full flex justify-center items-center   px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] focus:outline-[1px] focus:outline-solid outline-[#84caff] focus:shadow-custom"
                                            >
                                                <div
                                                    onClick={() => setIsActive(!isActive)}
                                                    className="flex justify-between items-start w-full"
                                                >
                                                    <h1>{selected[0]?.name}</h1>
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
                                                    {people.map((item) => (
                                                        <div
                                                            onClick={() => handleActive(item.name)}
                                                            key={crypto.randomUUID()}
                                                            className="py-[10px] px-[8px] rounded-[6px] hover:bg-[#F9FAFB] flex justify-between items-center"
                                                        >
                                                            <h1>{item.name}</h1>
                                                            <div>
                                                                {item.check && (
                                                                    <img src={check1} alt="sdafasf" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            </button>
                                            <button
                                                className="w-full mt-[32px] bg-[#1570EF] text-[#fff] text-[16px] font-[600] rounded-[8px] px-[16px] py-[10px] border-[1px] border-solid border-[#1570EF]"
                                                onClick={handleSubmit}
                                            >
                                                Qo'shish
                                            </button>
                                        </div>
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

export default Admin;
