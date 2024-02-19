import React, { useEffect, useState } from "react";
import Pagination from "../pagination/pagination";
import { addadmin } from "../admin/img";
import { ApiServices } from "../../services/api.get";
import "./news.scss";
import { useDispatch, useSelector } from "react-redux";
import { NewsCreateModal, ShowSelectNews } from "../../reducer/events";
import CreateModal from "./create-modal";
import SelectNews from "./select-news";
import { plus } from "../banner/banner-img";
import Loader from "../loader/loader";
const News = () => {
  const { newsCreate } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShowAllNews = (id) => {
    dispatch(ShowSelectNews([id, news]));
  };
  const handleCreateNews = () => {
    dispatch(NewsCreateModal());
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await ApiServices.getData("news/all", token);
        setNews(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [newsCreate]);

  return (
    <div className="news px-[24px] py-[32px] w-full">
      <section className="flex justify-between items-center">
        <h1 className="text-[24px] font-[500]">Yangiliklar</h1>
        <div
          onClick={handleCreateNews}
          className="add-news flex justify-center items-center gap-[6px] px-[14px] py-[10px] cursor-pointer"
        >
          <img src={plus} alt="addadmin" />
          <h1 className="text-[14px] font-[600]">Qo’shish</h1>
        </div>
      </section>
      <div className="h-[1px] bg-[#EAECF0] my-[15px]"></div>
      {loading ? (
        <Loader />
      ) : (
        <section className="w-full grid grid-cols-3 gap-[16px]">
          {news
            ?.slice()
            .reverse()
            .map((item) => (
              <div
                className="bg-[#F9FAFB] p-[24px] rounded-[16px] flex flex-col justify-between"
                key={crypto.randomUUID()}
              >
                <h1 className="text-balance text-[20px] text-[#101828] font-[500]">
                  {item.title.length > 40
                    ? `${item.title.slice(0, 40)}...`
                    : item.title}
                </h1>
                <p className="text-balance font-[400] text-[#475467] text-[16px] pt-[16px]">
                  {item.message.length > 300
                    ? `${item.message.slice(0, 300)}...`
                    : item.message}
                </p>
                <button
                  onClick={() => handleShowAllNews(item.id)}
                  className="news-btn h-[30px] rounded-[12px] mt-[10px] bg-[#eff0f1] hover:bg-[#ecedee]"
                >
                  Batafsil
                </button>
              </div>
            ))}
        </section>
      )}
      <CreateModal />
      <SelectNews />
    </div>
  );
};

export default News;
