import React, { useEffect, useState } from "react";
import { calendar } from "./img";
import Calendar from "react-calendar";
import "./home.scss";
import Monitoring from "./monitoring";
import { motion } from 'framer-motion'
import { check1 } from "../admin/img";

const Home = () => {
  const [date, setDate] = useState([
    {
      id: 1,
      title: "Kunlik",
      key: "DAILY",
      check: false
    },
    {
      id: 2,
      title: "Oylik",
      key: "MONTHLY",
      check: false
    },
    {
      id: 3,
      title: "Yillik",
      key: "YEARLY",
      check: false
    }
  ])
  const [activeDateName, setActiveDateName] = useState("Oylik")
  const [isActive, setIsActive] = useState(false);
  const [isDateActive, setIsDateActive] = useState(false);
  const [value, onChange] = useState(new Date());
  const [fetchData, setFetchData] = useState({ key: "MONTHLY" })
  const formattedDate =
    value.getFullYear() +
    "-" +
    String(value.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(value.getDate()).padStart(2, "0");
  const handleActiveDate = (id) => {
    setDate((prevDate) => {
      const updatedDate = prevDate.map((item) => {
        if (item.id === id) {
          return { ...item, check: true };
        }
        return { ...item, check: false }; // Set other items' check to false
      });

      const selectedItem = updatedDate.find((item) => item.id === id);
      setActiveDateName(selectedItem.title);
      setFetchData({
        ...fetchData,
        key: selectedItem.key
      })
      return updatedDate;
    });
  }

  useEffect(() => {
    setFetchData({
      ...fetchData,
      date: formattedDate,
    })
  }, [formattedDate])
  return (
    <div className="home px-[24px] py-[32px] w-full">
      <section className="flex justify-between items-center">
        <h1 className="text-[24px] font-[500]">Monitoring</h1>
        <div className="flex justify-center items-center gap-[16px]">
          <div onClick={() => setIsDateActive(!isDateActive)} className="w-[100px] relative filter-data flex justify-center items-center px-[14px] py-[10px] cursor-pointer gap-[4px] z-10">
            <img src={calendar} alt="filter-data" />
            <h1 className="w-[80%] text-[14px] font-[600]">{activeDateName}</h1>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isDateActive ? 1 : 0,
                scale: isDateActive ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`w-[200px] absolute border-[1px] border-solid p-[4px] rounded-[8px] border-[#EAECF0] top-[45px] gap-[5px] flex flex-col justify-between  px-[6px] bg-[#fff] right-0`}
            >
              {date.map((item) => (
                <div
                  onClick={() => handleActiveDate(item.id)}  // <-- Fix the double function invocation
                  key={item.id}
                  className="py-[10px] px-[8px] rounded-[6px] hover:bg-[#F9FAFB] flex justify-between items-center"
                >
                  <h1>{item.title}</h1>
                  <div>
                    {item.check && (
                      <img src={check1} alt="sdafasf" />
                    )}
                  </div>
                </div>
              ))}

            </motion.div>
          </div>
          <section className="relative">
            <div onClick={() => setIsActive(!isActive)} className={`${isActive && "active"} calendar px-[14px] py-[10px] cursor-pointer`}>
              <img src={calendar} alt="" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? 1 : 0 }}
              className="absolute right-0 bg-[#fff] z-10 top-[50px]">
              <Calendar
                className={
                  "border-solid border-[1px] border-[#EAECF0] rounded-[12px]"
                }
                onChange={(date) => onChange(date)}
                value={value}
              />
            </motion.div>
          </section>
        </div>
      </section>
      <div className="h-[1px] bg-[#EAECF0] my-[15px]"></div>
      <Monitoring getData={fetchData} />
    </div>
  );
};

export default Home;
