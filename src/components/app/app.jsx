import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ApiServices } from '../../services/api.get'
import { logo1, logo2, logo3, home, admin, category, news, banner, faq, logout, user, contact } from './img'
import Login from '../login/login'
import Home from '../home/home'
import Category from '../category/category'
import Department from '../department/department'
import Admin from '../admin/admin'
import News from '../news/news'
import Banner from '../banner/banner'
import FAQ from '../faq/faq'
import Users from '../users/users'
import './app.scss'
import Contact from '../contact/contact'
const links = [
    {
        id: 1,
        name: "Home",
        icon: home,
        url: ['/']
    },
    {
        id: 2,
        name: "Admin",
        icon: admin,
        url: ['/admin']
    },
    {
        id: 3,
        name: "Kategoriya",
        icon: category,
        url: ['/category', '/department']
    },
    {
        id: 4,
        name: "Yangiliklar",
        icon: news,
        url: ['/news']
    },
    {
        id: 5,
        name: "Banner",
        icon: banner,
        url: ['/banner']
    },
    {
        id: 6,
        name: "FAQ",
        icon: faq,
        url: ['/faq']
    },
    {
        id: 7,
        name: "Foydalanuvchilar",
        icon: user,
        url: ['/users']
    },
    {
        id: 8,
        name: "Contact",
        icon: contact,
        url: ['/contact']
    },
]
const App = () => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState();
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    return navigate('/login');
                }
                const response = await ApiServices.getData("admin/", token);
                setAdminData(response);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [pathname, navigate]);
    const handleLogOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    const getInitials = (fullName) => {
        if (!fullName) return '';
        const words = fullName.split(' ');
        const initials = words.map((word) => word[0]);
        return initials.join('').toUpperCase();
    };
    return (
        <div className={`app ${!(pathname === '/login') && "max-w-[1440px]"} mx-auto`}>
            {!(pathname === '/login') && (
                <div className='w-[20%] mx-auto sidebar sticky top-0 h-screen'>
                    <div className="flex flex-row py-[32px] justify-start pl-[28px] items-center gap-1">
                        <img className='w-[38px]' src={logo3} alt="logo" />
                        <div className="flex flex-col items-start">
                            <img className='w-[88px]' src={logo1} alt="logo" />
                            <img className="w-[48px]" src={logo2} alt="logo" />
                        </div>
                    </div>
                    <header className='w-full px-[16px] flex flex-col gap-[4px]'>
                        {links.map(item => (
                            <div
                                onClick={() => navigate(item.url[0])}  // Assuming you want to navigate to the first path in the array
                                key={item.id}
                                className={`${item.url.includes(pathname) && "active "} hover:bg-[#F9FAFB] flex items-center px-[12px] py-[8px]  gap-[12px] cursor-pointer`}
                            >
                                <img src={item.icon} alt={item.name} />
                                <h1 className='text-[16px] font-[600]'>{item.name}</h1>
                            </div>
                        ))}
                    </header>
                    <footer className='w-full absolute bottom-0 left-0 flex justify-between px-[16px] pb-[32px]'>
                        <section className='flex justify-center items-center gap-[12px]'>
                            <div className=' text-[16px] font-[600] flex items-center justify-center w-[40px] h-[40px] rounded-full border-[1px] border-solid border-[#dfe0e3] bg-[#f2f4f7]'>
                                {getInitials(adminData?.fullName)}
                            </div>
                            <article className='flex flex-col justify-center'>
                                <h1 className='text-[#344054] text-[14px] font-[600]'>{adminData?.fullName}</h1>
                                <p className='font-[400] text-[14px]'>{adminData?.role}</p>

                            </article>
                        </section>
                        <div onClick={handleLogOut} className='logout-img flex justify-center items-center hover:bg-[#F9FAFB] rounded-[12px]'>
                            <img className=' cursor-pointer p-[8px]' src={logout} alt="logout" />
                        </div>
                    </footer>
                </div>
            )}
            <div className={`${pathname === '/login' ? "w-full" : "w-[80%] "}`}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/category' element={<Category />} />
                    <Route path='/department' element={<Department />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/banner' element={<Banner />} />
                    <Route path='/faq' element={<FAQ />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </div>
        </div>
    )
}

export default App