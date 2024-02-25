import React, { useEffect, useState } from 'react';
import loginback from './Section.png';
import bg from './bg.svg'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import './login.scss'
const Login = () => {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });
    const [admin, setAdmin] = useState('')
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate()
    const { pathname } = useLocation();

    const handleInputChange = (e) => {
        const rawInput = e.target.value;
        const sanitizedInput = rawInput.replace(/[^0-9+-]/g, ''); // Allow only digits, +, and -

        const { name } = e.target;
        setFormData({
            ...formData,
            [name]: sanitizedInput,
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://avtowatt.uz/api/v1/auth/login/admin",
                JSON.stringify(formData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            localStorage.setItem("token", response.data.token);
        } catch (err) {
            setErrorMessage(err.response.data);
        }
        const token = localStorage.getItem("token")
        if (token) {
            const getData = async () => {
                try {
                    const token = localStorage.getItem("token")
                    const response = await axios.get(
                        "https://avtowatt.uz/api/v1/admin/",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    console.log(response);
                    if (response?.data?.role === "ROLE_MODERATOR") {
                        setErrorMessage('Admin topilmadi! Iltimos qaytadan kiriting.')
                        localStorage.removeItem("token")
                    } else {
                        setFormData({
                            phone: '',
                            password: '',
                        });
                    }
                    setAdmin(response?.data?.role)
                } catch (err) {
                    console.log(err)
                }
            }
            getData()
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/')
        }
        //eslint-disable-next-line
    }, [admin, pathname])
    return (
        <section className='login-page flex justify-center items-center w-full'>
            <div className='login w-1/2 flex flex-col justify-center items-center '>
                <img className='absolute w-[770px] top-[0px] z-[-1]' src={bg} alt="" />
                <h1 className='w-[360px] text-[30px] font-[600] text-center'>Tizimga kirish</h1>
                <p className='w-[360px] text-[16px] font-[400] text-[#475467] text-center'>
                    Boshqaruv paneliga kirish uchun telefon raqamingiz va parolni kiriting
                </p>
                <form className='w-[360px] flex flex-col gap-[20px] pt-[32px]'>
                    {errorMessage?.errorMessage && (
                        <motion.h1
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                        >
                            {errorMessage?.errorMessage}
                        </motion.h1>
                    )}
                    {admin === "ROLE_MODERATOR" && (
                        <motion.h1
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                        >
                            {errorMessage}
                        </motion.h1>
                    )}

                    <div className='flex flex-col items-start gap-[6px]'>
                        <div className='flex justify-start items-center gap-2'>
                            <label className='text-[14px] font-[500]' htmlFor='text'>Telefon raqam</label>
                            {errorMessage?.phone && (
                                <motion.h1
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                >
                                    {errorMessage?.phone}
                                </motion.h1>
                            )}
                        </div>

                        <input
                            className='w-full flex px-[14px] py-[10px] login-input'
                            type='text'
                            value={formData.phone}
                            placeholder='+998 (88) 123 45 67'
                            name='phone'
                            onChange={handleInputChange} // Add onChange event
                        />
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                        <div className='flex items-center justify-start gap-2'>
                            <label className='text-[14px] font-[500]' htmlFor='password'>Parol</label>
                            {errorMessage?.password && (
                                <motion.h1
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[12px] bg-red-200 rounded-[12px] p-[5px]"
                                >
                                    {errorMessage?.password}
                                </motion.h1>
                            )}
                        </div>
                        <input
                            className='w-full flex px-[14px] py-[10px] login-input'
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        type='submit'
                        className='login-btn w-full'
                    >
                        Kirish
                    </button>
                </form>
            </div>
            <img
                className='w-1/2 h-screen object-cover'
                src={loginback}
                alt='logo'
            />
        </section>
    );
};

export default Login;
