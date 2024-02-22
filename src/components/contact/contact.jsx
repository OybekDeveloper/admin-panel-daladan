import React, { useEffect, useState } from "react";
import { trash } from "../category/category-img";
import { ApiServices } from "../../services/api.get";
import { useDispatch, useSelector } from "react-redux";
import { CreateModalData, DeleteModalData } from "../../reducer/events";
import Loader from "../loader/loader";
import { plus } from "../banner/banner-img";
import "./contact.scss";
import DeleteModal from "./delete-modal";
import CreateModal from "./create-modal";

const Contact = () => {
    const dispatch = useDispatch();
    const { modalDel, modalCreate } = useSelector((state) => state.events);
    const [loading, setLoading] = useState(true);
    const [contact, setContact] = useState([]);
    const handleDeleteContact = (id) => {
        dispatch(DeleteModalData(id));
    };
    const handleCreateContact = () => {
        dispatch(CreateModalData())
    }
    useEffect(() => {
        const body = document.querySelector(".app");
        if (modalDel || modalCreate) {
            body.classList.add("blur-effect");
        } else {
            body.classList.remove("blur-effect");
        }
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await ApiServices.getData("contact/all", token);
                console.log(response);
                setContact(response);
            } catch (err) {
                console.log(err);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchData();
    }, [modalDel, modalCreate]);
    return (
        <div className="contact px-[24px] py-[32px] w-full">
            <section className="flex justify-between items-center w-full ">
                <h1 className="text-[24px] font-[500]">Malumotlar</h1>
                <div
                    onClick={handleCreateContact}
                    className="add-contact flex justify-center items-center gap-[6px] px-[14px] py-[10px] cursor-pointer"
                >
                    <img src={plus} alt="addadmin" />
                    <h1 className="text-[14px] font-[600]">Qo’shish</h1>
                </div>
            </section>
            <div className="h-[1px] bg-[#EAECF0] my-[15px]"></div>
            {loading ? (
                <Loader />
            ) : (
                <section className="contact-list w-full">
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                    Tartib raqami
                                </th>
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                    Rasm
                                </th>
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                    Nomi
                                </th>
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                    Link
                                </th>
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start"></th>
                            </tr>
                        </thead>
                        <tbody className="w-full whitespace-nowrap overflow-y-auto">
                            {contact
                                ?.slice()
                                .reverse()
                                .map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className={`border-t ${idx % 2 === 0 && "bg-[#F9FAFB]"}`}
                                    >
                                        <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                            {idx + 1}
                                        </td>
                                        <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                            <div className="flex gap-[12px] justify-start items-center">
                                                <img
                                                    className="object-center w-[40px] h-[40px]"
                                                    src={item?.icon}
                                                    alt={item?.name}
                                                />
                                            </div>
                                        </td>
                                        <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                            {item?.name}
                                        </td>
                                        <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                            {item?.url}
                                        </td>
                                        <td className="hover:bg-[#f9fafb] cursor-pointer  w-[100px] text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                            <img
                                                onClick={() => {
                                                    handleDeleteContact(item?.id);
                                                }}
                                                className="p-[10px]"
                                                src={trash}
                                                alt="trash"
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </section>
            )}
            <DeleteModal />
            <CreateModal />
        </div>
    );
};

export default Contact;
