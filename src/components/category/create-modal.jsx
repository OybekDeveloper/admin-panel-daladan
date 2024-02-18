import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryCreateModal } from "../../reducer/events";
import { close, upload } from "./category-img";
import { ApiServices } from "../../services/api.get";
import { motion } from "framer-motion";
import { imageDb } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { toast } from "react-toastify";

const CreateModal = () => {
    const { categoryCreate } = useSelector((state) => state.events);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showProgress, setShowProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [errorMessagePost, setErrorMessagePost] = useState();
    const [categoryCreateData, setCategoryCreatetData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryCreatetData({
            ...categoryCreateData,
            [name]: value,
        });
    };
    const handleFileUploaded = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imgRef = ref(imageDb, `files/${file.name}`);
        uploadBytes(imgRef, file)
            .then(() => {
                return getDownloadURL(imgRef);
            })
            .then((url) => {
                setCategoryCreatetData({ ...categoryCreateData, photoUrl: url })
            })
            .catch((error) => {
                console.error("Error getting download URL:", error);
                if (error.code === "storage/object-not-found") {
                    console.error("File not found in Firebase Storage");
                }
            });

        const fileType = file.type;

        if (fileType === "image/jpeg" || fileType === "image/png") {
            setErrorMessage("");
            const fileName =
                file.name.length > 12
                    ? `${file.name.substring(0, 13)} ... .${file.name.split(".")[1]}`
                    : file.name;

            const formData = new FormData();
            formData.append("file", file);
            setShowProgress(true);
            const fetchData = async () => {
                try {
                    await axios.post(
                        "",
                        formData,
                        {
                            onUploadProgress: ({ loaded, total }) => {
                                const newLoadingPercentage = Math.floor((loaded / total) * 100);
                                setLoadingPercentage(newLoadingPercentage);
                                if (total === loaded) {
                                    const fileSize =
                                        total < 1024 * 1024
                                            ? `${(total / 1024).toFixed(2)} KB`
                                            : `${(loaded / (1024 * 1024)).toFixed(2)} MB`;

                                    setUploadedFile({ name: fileName, size: fileSize });
                                }
                            },
                        }
                    );
                } catch (err) {
                }
            }
            fetchData()
        } else {
            setErrorMessage("Upload only png and jpg images!");
        }
    };
    const handleClose = () => {
        dispatch(CategoryCreateModal());
        setShowProgress(false);
        setUploadedFile(null);
        setErrorMessagePost(null)
        setIsLoading(true)
        setCategoryCreatetData(null)

    };
    useEffect(() => {
        if (categoryCreateData?.photoUrl) setIsLoading(false);
    }, [categoryCreateData])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoading) {
            const fetchData = async () => {
                try {
                    const token = localStorage.getItem('token')
                    await ApiServices.postData(
                        `category`,
                        categoryCreateData,
                        token
                    );
                    toast.success("Category successfully created!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setCategoryCreatetData(null)
                    setUploadedFile(null)
                    setShowProgress(false)
                    setIsLoading(true)
                    setErrorMessagePost(null)
                    dispatch(CategoryCreateModal());
                } catch (err) {
                    console.log(err);
                    setErrorMessagePost(err?.response?.data)
                }
            };
            fetchData();
        }
    };
    return (
        <div>
            <Transition show={categoryCreate} as={Fragment}>
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
                                            Kategoriya qo'shish
                                        </h1>
                                        <img
                                            onClick={handleClose}
                                            className="cursor-pointer w-[24px]"
                                            src={close}
                                            alt=""
                                        />
                                    </div>
                                    <p className="text-[14px] font-[400] text-[#475467] pt-[4px]">
                                        Kategoriya qo'shish uchun quyidagi ma’lumotlarni
                                        to’ldiring
                                    </p>
                                    <form className="w-[360px] flex flex-col gap-[16px] pt-[10px]">
                                        <div className="flex flex-col gap-[6px]">
                                            <label className="flex justify-start items-center gap-2 text-[14px] font-[500]" htmlFor="text">
                                                <h1> Kategoriya nomi (lotincha)</h1>
                                                {errorMessagePost?.nameL && (
                                                    <motion.h1
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                                    >
                                                        {errorMessagePost?.nameL}
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
                                                <h1>Kategoriya nomi (kirilcha)</h1>
                                                {errorMessagePost?.nameK && (
                                                    <motion.h1
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                                    >
                                                        {errorMessagePost?.nameK}
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
                                        {errorMessage && (
                                            <motion.h1
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="w-full bg-red-200 rounded-[12px] p-[5px] mt-[10px]"
                                            >
                                                {errorMessage}
                                            </motion.h1>
                                        )}
                                        {!showProgress ? (
                                            <div className="border-solid border-[1px] border-[#EAECF0] rounded-[12px] p-[24px] flex justify-center items-center flex-col">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    hidden
                                                    ref={fileInputRef}
                                                    onChange={handleFileUploaded}
                                                    className="file-input"
                                                />
                                                <div
                                                    onClick={handleFileInputClick}
                                                    className="icon pb-[12px]"
                                                >
                                                    <img
                                                        className=" p-[10px] rounded-[8px] border-solid border-[1px] border-[#EAECF0]"
                                                        src={upload}
                                                        alt="upload"
                                                    />
                                                </div>
                                                <p className="text-[#1570EF] text-[14px] font-[600] pb-[4px]">
                                                    Rasm yuklang
                                                </p>
                                                <p className="text-[12px] font-[400] text-[#475467]">
                                                    PNG, JPG (max. 345x180px)
                                                </p>
                                            </div>
                                        ) : (
                                            <section className="w-full flex border-solid border-[1px] border-[#EAECF0] rounded-[12px]">
                                                {loadingPercentage > 0 && (
                                                    <li className="w-full list-none p-[16px] rounded-[12px] flex gap-[12px]">
                                                        <div className="w-[20%]">
                                                            <img
                                                                src="https://cdn-icons-png.flaticon.com/512/29/29072.png"
                                                                alt="fasf"
                                                            />
                                                        </div>
                                                        <div className="w-[80%] content flex flex-col gap-[4px] ">
                                                            <div className="name-content flex justify-between items-start ">
                                                                <div className="name">
                                                                    <h1 className="text-[14px] font-[500] text-[#344054]">
                                                                        {uploadedFile ? uploadedFile.name : ""}
                                                                    </h1>
                                                                    <p className="text-[14px] font-[400] text-[#475467]">
                                                                        {uploadedFile ? uploadedFile.size : ""}
                                                                    </p>
                                                                </div>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={uploadedFile !== null && true}
                                                                    onChange={() => { }}
                                                                />
                                                            </div>
                                                            <div className="loading-content flex justify-between items-center gap-[12px]">
                                                                <div className="loading-bar h-[14px] w-full bg-[#fff] rounded-[30px] border-solid border-[1px] border-[#EAECF0]">
                                                                    <div
                                                                        style={{ width: `${loadingPercentage}%` }}
                                                                        className={`loading h-full  bg-[#2E90FA] rounded-[30px]`}
                                                                    ></div>
                                                                </div>
                                                                <h1>{`${loadingPercentage}%`}</h1>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </section>
                                        )}

                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className={`${isLoading && "opacity-[0.5]"} w-full mt-[32px] bg-[#2E90FA] text-[#fff] text-[16px] font-[600] rounded-[8px] px-[16px] py-[10px] border-[1px] border-solid border-[#1570EF]`}
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
