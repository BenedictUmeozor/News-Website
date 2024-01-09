import Search from "antd/es/input/Search";
import { memo } from "react";

type Props = {
  onSearch: (term: string) => Promise<void>;
  getNews: () => Promise<void>;
};

function getFormattedDate() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDate = new Date();

  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return `${day} ${month} ${year}`;
}

const Header = memo(({ onSearch, getNews }: Props) => {
  const handleInput = async (value: string) => {
    await onSearch(value.toLowerCase().trim());
  };
  return (
    <div>
      <header className="py-6 flex items-center justify-between max-md:flex-col max-md:block">
        <h1
          className="font-bold text-primary text-3xl flex-[2] cursor-pointer max-md:mb-4 max-md:text-center hover:text-[#2b2c61]"
          onClick={getNews}
        >
          News Updates
        </h1>
        <div className="flex-1">
          <Search
            allowClear
            placeholder="Search.."
            onSearch={handleInput}
            className="w-full max-md:w-[95%] mx-auto block"
          />
        </div>
      </header>
      <p className="font-semibold mb-4">- {getFormattedDate()}</p>
    </div>
  );
});
export default Header;
