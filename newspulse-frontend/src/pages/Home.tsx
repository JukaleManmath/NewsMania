import { useEffect, useState } from "react";
import { fetchNews } from "../api/newsApi";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import BreakingNewsBanner from "../components/BreakingNewsBanner";
import BreakingNewsSlider from "../components/BreakingNewsSlider";

const Home = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      const newsData = await fetchNews();
      setNews(newsData);
      setLoading(false);
    };
    loadNews();
  }, []);

  const topSix = news.slice(0,6);
  const nextSix = news.slice(6,12);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <BreakingNewsBanner articles={topSix} />
      <BreakingNewsSlider articles = {nextSix} />
      <div className="container mx-auto p-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Latest News</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isLoading ? (
            <Loader />
          ) : (
            news.map((article, index) => <NewsCard key={index} article={article} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
