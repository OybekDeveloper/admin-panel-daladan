import React, { useEffect, useState } from 'react';
import loginback from './Section.png';
import './login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate()
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
            setErrorMessage(err.response.data.errorMessage);
        }
        setFormData({
            phone: '',
            password: '',
        });
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/')
        }
    })
    return (
        <section className='login-page flex justify-center items-center w-full'>
            <div className='login w-1/2 flex flex-col justify-center items-center '>
                <h1 className='w-[360px] text-[30px] font-[600] text-center'>Tizimga kirish</h1>
                <p className='w-[360px] text-[16px] font-[400] text-[#475467] text-center'>
                    Boshqaruv paneliga kirish uchun telefon raqamingiz va parolni kiriting
                </p>
                <form className='w-[360px] flex flex-col gap-[20px] pt-[32px]'>
                    {errorMessage && <h1 className='bg-red-200 rounded-[12px] p-[10px]'>{errorMessage}</h1>}

                    <div className='flex flex-col items-start gap-[6px]'>
                        <label className='text-[14px] font-[500]' htmlFor='text'>Telefon raqam</label>
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
                        <label className='text-[14px] font-[500]' htmlFor='password'>Parol</label>
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
