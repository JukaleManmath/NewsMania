import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNews } from "../api/newsApi";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";

const NewsCategory = () => {
  const { category } = useParams(); // Get category from URL
  const [news, setNews] = useState([]);
  const [isLoading , setLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      if (category) {
        const newsData = await fetchNews(category);
        setNews(newsData);
        setLoading(false);
      }
    };
    loadNews();
    
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 capitalize">{category} News</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading ? <Loader />:
        news.length > 0 ? (
          news.map((article, index) => <NewsCard key={index} article={article} />)
        ) : (
          <p className="text-gray-500">No news available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default NewsCategory;
