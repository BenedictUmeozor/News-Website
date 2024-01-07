import { LazyLoadComponent } from "react-lazy-load-image-component";
import { lightFormat } from "date-fns";
import date from "../assets/date.svg";
import category from "../assets/category.svg";
import arrow from "../assets/arrow.svg";
import newsImage from "../assets/news.png";
import { memo } from "react";
import { News as NewsType } from "../types";

type Props = {
  news: NewsType;
};

const News = memo(({ news }: Props) => {
  return (
    <div>
      <div className="relative h-52">
        <LazyLoadComponent>
          <img
            src={news.image ? news.image : newsImage}
            alt="image"
            className="h-full w-full"
          />
        </LazyLoadComponent>
      </div>
      <div className="flex items-center gap-4 my-4">
        <span className="inline-flex items-center gap-4">
          <img src={date} alt="date" className="w-5 rounded" />{" "}
          {lightFormat(new Date(news.published_at), "yyyy-MM-dd")}
        </span>{" "}
        |
        <span className="inline-flex items-center gap-4">
          <img src={category} alt="category" className="w-5" /> {news.category}
        </span>
      </div>
      <div>
        <a
          href={news.url}
          rel="noreferer noopener"
          target="_blank"
          className="block text-primary font-semibold text-xl mb-3 hover:text-[#030372]"
        >
          {news.title.length < 80
            ? news.title
            : news.title.substring(0, 80) + "..."}
        </a>
        <div className="text-light_text text-[0.95rem] mb-3">
          {news.description.length < 150
            ? news.description
            : news.description.substring(0, 200) + "..."}
        </div>
      </div>
      <hr />
      <div className="mt-3 flex items-center justify-between">
        <div>
          {news.author && <p className="text-light_text">By {news.author}</p>}
          {news.source && <p>{news.source}</p>}
        </div>
        <a
          href={news.url}
          rel="noreferer noopener"
          target="_blank"
          className="inline-flex items-center gap-1 bg-primary text-white rounded py-2 px-4 text-[0.9rem] transition-all duration-150 ease-linear hover:scale-95"
        >
          Read more <img src={arrow} className="w-4" alt="" />
        </a>
      </div>
    </div>
  );
});
export default News;
