import React, { useEffect, useState } from 'react'
import Pagination from '../pagination/pagination'
import { ApiServices } from '../../services/api.get';
import './category.scss'
import { addadmin } from '../admin/img';
import { useLocation, useNavigate } from 'react-router-dom';
import { edit, trash } from './category-img';
import DeleteModal from './delete-modal';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryCreateModal, CategoryDeleteModal, CategoryEditModal } from '../../reducer/events';
import EditModal from './edit-modal';
import CreateModal from './create-modal';
const Category = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { categoryDel, categoryEdit } = useSelector(state => state.events)
    const { pathname } = useLocation()
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await ApiServices.getData("category/all", token)
                setCategory(response)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [categoryEdit, categoryDel])
    const handleCategoryDelete = (id) => {
        dispatch(CategoryDeleteModal(id))
    }
    const handleCategoryEdit = (id) => {
        dispatch(CategoryEditModal(id));
    };
    const handleCategoryCreate = () => {
        dispatch(CategoryCreateModal())
    }
    return (
        <div className='category px-[24px] py-[32px] w-full'>
            <section className="flex justify-between items-center">
                <ul className='flex category-links'>
                    <li onClick={() => navigate('/category')} className={`${(pathname === '/category') && "bg-[#F9FAFB]"} cursor-pointer rounded-l-[8px] w-[110px] flex justify-center items-center hover:bg-[#F9FAFB] py-[8px] border-r-[1px] border-r-solid border-r-[#D0D5DD]`}>
                        Kategoriya
                    </li>
                    <li onClick={() => navigate('/department')} className={`${(pathname === '/department') && "bg-[#F9FAFB]"} cursor-pointer rounded-r-[8px] w-[110px] flex justify-center items-center hover:bg-[#F9FAFB] py-[8px]`}>
                        Bo’lim
                    </li>
                </ul>
                <div
                    onClick={handleCategoryCreate}
                    className="add-category flex justify-center items-center gap-[6px] px-[14px] py-[10px]"
                >
                    <img src={addadmin} alt="addadmin" />
                    <h1 className="text-[14px] font-[600]">Kategoriya qo’shish</h1>
                </div>
            </section>
            <div className="h-[1px] bg-[#EAECF0] my-[15px]"></div>
            <section className="category-list w-full ">
                <h1 className="text-[18px] font-[600] px-[24px] py-[20px]">
                    Kategoriyalar ro’yxati
                </h1>
                <table className="min-w-full">
                    <thead>
                        <tr className="border-t">
                            <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                Rasmi
                            </th>
                            <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                Nomi(lotincha)
                            </th>
                            <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">
                                Nomi(kirilcha)
                            </th>
                            <th className="text-[12px] font-[500] text-[#475467] py-[12px] px-[24px] border-b text-start">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="w-full whitespace-nowrap overflow-y-auto">
                        {category?.map((item, idx) => (
                            <tr
                                key={item?.id}
                                className={`border-t ${idx % 2 === 0 && "bg-[#F9FAFB]"}`}
                            >
                                <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[500] text-[#101828] py-[16px] px-[24px]">
                                    <img className='w-[40px] h-[40px]' src={item?.photoUrl} alt={item?.name} />
                                </td>
                                <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                    {item?.nameL}
                                </td>
                                <td className="hover:bg-[#f9fafb] cursor-pointer text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                    {item?.nameK}
                                </td>
                                <td className="hover:bg-[#f9fafb] cursor-pointer  w-[100px] text-[14px] font-[400] text-[#475467] py-[16px] px-[24px]">
                                    <div className='flex px-[16px] justify-center items-center'>
                                        <img onClick={() => handleCategoryDelete(item?.id)} className='p-[10px]' src={trash} alt="trash" />
                                        <img onClick={() => handleCategoryEdit(item?.id)} className='p-[10px]' src={edit} alt="trash" />
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='px-[24px] py-[12px]'>
                    <Pagination />
                </div>
            </section>
            <EditModal />
            <CreateModal />
            <DeleteModal />
        </div>
    )
}

export default Category