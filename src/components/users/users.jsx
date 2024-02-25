import React, { useEffect, useState } from "react";
import { trash } from "../category/category-img";
import "./users.scss";
import { ApiServices } from "../../services/api.get";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModalData } from "../../reducer/events";
import DeleteModal from "./delete-modal";
import Loader from "../loader/loader";
import InfoImg from '../img-blurhash/info-img'
const Users = () => {
    const dispatch = useDispatch();
    const { modalDel } = useSelector((state) => state.events);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const handleDeleteUser = (id) => {
        dispatch(DeleteModalData(id));
    };
    useEffect(() => {
        const body = document.querySelector(".app");
        if (modalDel) {
            body.classList.add("blur-effect");
        } else {
            body.classList.remove("blur-effect");
        }
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await ApiServices.getData("users/all", token);
                console.log(response);
                setUsers(response);
            } catch (err) {
                console.log(err);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchData();
    }, [modalDel]);
    return (
        <div className="users px-[24px] py-[32px] w-full">
            <section className="flex justify-between items-center">
                <h1 className="text-[24px] font-[500]">Foydalanuvchilar</h1>
            </section>
            <div className="h-[1px] bg-[#EAECF0] my-[15px]"></div>
            {loading ? (
                <Loader />
            ) : (
                <section className="users-list w-full">
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                    Tartib raqami
                                </th>
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                    Familiya, Ism
                                </th>
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                    Telefon raqami
                                </th>
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start"></th>
                            </tr>
                        </thead>
                        <tbody className="w-full whitespace-nowrap overflow-y-auto">
                            {users
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
                                                <InfoImg src={item?.photoUrl} />
                                                {item?.name + " " + item?.surname}
                                            </div>
                                        </td>
                                        <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                            {item?.phone}
                                        </td>
                                        <td className="hover:bg-[#f9fafb] cursor-pointer  w-[100px] text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                            <img
                                                onClick={() => {
                                                    handleDeleteUser(item?.id);
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
        </div>
    );
};

export default Users;
