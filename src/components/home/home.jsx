import React from 'react'
import { calendar } from './img'
import './home.scss'
const Home = () => {
  return (
    <div className='home px-[24px] py-[32px]'>
      <section className='flex justify-between items-center'>
        <h1 className='text-[24px] font-[500]'>Monitoring</h1>
        <div className='flex justify-center items-center gap-[16px]'>
          <div className="active filter-data flex justify-center items-center px-[14px] py-[10px] cursor-pointer gap-[4px]" >
            <img src={calendar} alt="filter-data" />
            <h1 className='text-[14px] font-[600]'>Oylik</h1>
          </div>
          <div className="calendar px-[14px] py-[10px] cursor-pointer">
            <img src={calendar} alt="" />
          </div>
        </div>
      </section>
      <div className='h-[1px] bg-[#EAECF0] my-[15px]'></div>
    </div>
  )
}

export default Home