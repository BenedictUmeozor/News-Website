import { Pagination } from "antd";
import { v4 as uuidV4 } from "uuid";
import Container from "./components/Container";
import Header from "./components/Header";
import News from "./components/News";
import { useEffect, useState } from "react";
import {
  ApiResponse,
  News as NewsType,
  Pagination as PaginationType,
} from "./types";
import axios, { AxiosResponse } from "axios";
import Loader from "./components/Loader";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [news, setNews] = useState<NewsType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  type Obj = {
    keywords: string | null;
    limit: number | null;
    offset: number | null;
  };

  const request = async (
    keywords?: string,
    limit?: number,
    offset?: number
  ) => {
    const url: string = import.meta.env.VITE_BASE_API;

    const obj: Obj = {
      keywords: null,
      limit: null,
      offset: null,
    };

    if (keywords) {
      obj.keywords = keywords;
    }

    if (limit && limit > 0) {
      obj.limit = limit;
    }

    if (offset && offset > 0) {
      obj.offset = offset;
    }

    try {
      setIsLoading(true);
      setError(false);
      const response: AxiosResponse = await axios.post(url, obj);
      return response.data;
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getNews = async (
    keywords?: string,
    limit?: number,
    offset?: number
  ) => {
    const data: ApiResponse = await request(keywords, limit, offset);
    console.log(data);
    setNews(data.data);
    setPagination(data.pagination);
  };

  const handlePageChange = async (page: number, pageSize: number) => {
    const offset = (page - 1) * 9; // Calculate offset based on page number
    setCurrentPage(page);
    setPageSize(pageSize);
    await getNews(searchTerm, pageSize, offset);
  };

  const findBySearch = async (term: string) => {
    setSearchTerm(term);
    await getNews(term, pageSize || 9);
  };

  useEffect(() => {
    getNews("", 9);
  }, []);

  return (
    <>
      <main>
        <Container className="app">
          <Header
            onSearch={findBySearch}
            getNews={async () => await getNews("", 9)}
          />
          <div className="flex items-center justify-center">
            {" "}
            {!isLoading && news && news.length > 0 && (
              <div className="w-full">
                <section
                  style={{
                    rowGap: "4rem",
                    gridTemplateRows: "repeat(auto-fill, minmax(100px, 1fr))",
                  }}
                  className="py-4 grid grid-cols-3 gap-6 mb-6 w-full max-lg:grid-cols-2 max-md:grid-cols-1"
                >
                  {news.map((n) => (
                    <News news={n} key={uuidV4()} />
                  ))}
                </section>
                {pagination && (
                  <section className="flex items-center justify-center mb-4 w-full">
                    <Pagination
                      current={currentPage}
                      total={pagination.total}
                      pageSize={pageSize}
                      onChange={handlePageChange}
                    />
                  </section>
                )}
              </div>
            )}
            {!isLoading && news && news.length === 0 && (
              <div className="text-center text-xl my-10">No results found</div>
            )}
            {isLoading && (
              <div className="text-center text-xl my-10">Fetching news...</div>
            )}
            {error && (
              <div className="text-center font-bold text-xl my-10">
                <p>Oops. Something went wrong</p>
              </div>
            )}
          </div>
          <footer>
            <p className="text-center my-3">
              {" "}
              All rights reserved &copy;{" "}
              <a
                href="https://benedictumeozor.vercel.app"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary text-[0.9rem]"
              >
                Benedict
              </a>
            </p>
          </footer>
        </Container>
      </main>
      {isLoading && <Loader />}
    </>
  );
};
export default App;
