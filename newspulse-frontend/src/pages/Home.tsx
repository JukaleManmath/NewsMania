import { useEffect , useState } from "react";
import { fetchNews } from "../api/newsApi";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";


const Home = () => {
    const  [news , setNews]  = useState([])
    const [isLoading , setLoading] = useState(true)

    useEffect(() => {
        const loadNews = async() => {
            const newsData = await fetchNews();
            setNews(newsData);
            setLoading(false)
        };
        loadNews();
        
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Latest News</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {isLoading ? <Loader /> :
                news.map((article, index) => (
                    <NewsCard key= {index} article={article} />
                ))}
            </div>
        </div>
    )
}

export default Home;