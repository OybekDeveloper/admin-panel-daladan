import React, { useEffect, useState } from "react";
import { edit, trash } from "./category-img";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../pagination/pagination";
import { addadmin } from "../admin/img";
import { ApiServices } from "../../services/api.get";

const Department = () => {
    const [defpartment, setDepartMent] = useState();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const response = await ApiServices.getData(
                    "sub-category/all?type=string",
                    token
                );
                setDepartMent(response);
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <div className="category px-[24px] py-[32px] w-full">
                <section className="flex justify-between items-center">
                    <ul className="flex category-links">
                        <li
                            onClick={() => navigate("/category")}
                            className={`${pathname === "/category" && "bg-[#F9FAFB]"
                                } cursor-pointer rounded-l-[8px] w-[110px] flex justify-center items-center hover:bg-[#F9FAFB] py-[8px] border-r-[1px] border-r-solid border-r-[#D0D5DD]`}
                        >
                            Kategoriya
                        </li>
                        <li
                            onClick={() => navigate("/department")}
                            className={`${pathname === "/department" && "bg-[#F9FAFB]"
                                } cursor-pointer rounded-r-[8px] w-[110px] flex justify-center items-center hover:bg-[#F9FAFB] py-[8px]`}
                        >
                            Bo’lim
                        </li>
                    </ul>
                    <div className="add-category flex justify-center items-center gap-[6px] px-[14px] py-[10px]">
                        <img src={addadmin} alt="addadmin" />
                        <h1 className="text-[14px] font-[600]">Bo’lim qo’shish</h1>
                    </div>
                </section>
                <div className="h-[1px] bg-[#EAECF0] my-[15px]"></div>
                <section className="category-list w-full ">
                    <h1 className="text-[18px] font-[600] px-[24px] py-[20px]">
                        Bo’limlar ro’yxati
                    </h1>
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-t">
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                    Kategoriya nomi
                                </th>
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                    Nomi(lotincha)
                                </th>
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                    Nomi(kirilcha)
                                </th>

                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                    Status
                                </th>
                                <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start"></th>
                            </tr>
                        </thead>
                        <tbody className="w-full whitespace-nowrap overflow-y-auto">
                            {defpartment?.map((item, idx) => (
                                <tr
                                    key={item?.id}
                                    className={`border-t ${idx % 2 === 0 && "bg-[#F9FAFB]"}`}
                                >
                                    <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                        {item?.name}
                                    </td>
                                    <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                        {item?.nameL}
                                    </td>
                                    <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                        {item?.nameK}
                                    </td>
                                    <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                        <label class="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" />
                                            <div className="relative w-[36px] h-[20px] bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all  peer-checked:bg-[#53B1FD]"></div>
                                        </label>
                                    </td>
                                    <td className="hover:bg-[#f9fafb] cursor-pointer  w-[100px] text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                        <div className="flex px-[16px] justify-center items-center">
                                            <img
                                                onClick={() => { }}
                                                className="p-[10px]"
                                                src={trash}
                                                alt="trash"
                                            />
                                            <img
                                                onClick={() => { }}
                                                className="p-[10px]"
                                                src={edit}
                                                alt="trash"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-[24px] py-[12px]">
                        <Pagination />
                    </div>
                </section>
                {/* <EditModal />
              <DeleteModal /> */}
            </div>
        </div>
    );
};

export default Department;
