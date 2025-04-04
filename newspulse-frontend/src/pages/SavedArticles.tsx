import React, {useState, useEffect} from "react";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";

interface Article{
    id:string;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    category?: string;
    publishedAt?: string;
}

const SavedArticles: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleRemove = async (url: string) => {
        const token = localStorage.getItem("token");
        if (!token) return;
      
        try {
          const res = await fetch("http://localhost:8000/articles/remove", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ url }),
          });
      
          if (res.ok) {
            setArticles((prev) => prev.filter((a) => a.url !== url));
          } else {
            throw new Error("Failed to remove article");
          }
        } catch (err) {
          console.error("Remove error:", err);
          alert("Could not remove article.");
        }
      };
      

    useEffect(() => {
        const fetchSaved = async () => {
            const token = localStorage.getItem("token");
            if(!token){
                setError("You must be Logged in to view saved articles");
                setLoading(false);
                return;
            }

            try{
                const res = await fetch("http://localhost:8000/articles/saved",{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });
                if(!res.ok){
                    throw new Error("Failed to fetch saved articles");
                }
                const data = await res.json();
                setArticles(data);
            } catch(err){
                console.error(err);
                setError("Error fetching saved articles.");
            } finally{
                setLoading(false);
            }
        };
        fetchSaved();
    }, []);

    return(
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">
                Saved News Articles 📰
            </h1>
            {loading ?(
                <Loader />
            ):error?(
                <p className="text-red-500">{error}</p>
            ): articles.length === 0? (
                <p>No articles saved yet</p>
            ): (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {articles.map((article) => (
                        <NewsCard key={article.id} article={article} isSavedView={true} onRemove={handleRemove} />
                    ))}
                </div>
            )
            }
        </div>
    )
}

export default SavedArticles;