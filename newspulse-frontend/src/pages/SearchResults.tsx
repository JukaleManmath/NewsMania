import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchNews } from '../api/newsApi';
import NewsCard from '../components/NewsCard';

interface Article{
    title:string;
    description: string;
    url:string;
    category:string;
}
function SearchResults() {
    const [ searchParams ] = useSearchParams();
    const query = searchParams.get('q') || '';
    const category = searchParams.get("category") || "general";
    const [results, setResults] = useState<Article[]>([]);
    const [loading , setLoading] = useState(false);
    

    useEffect(()=>{
        const loadResults = async () => {
            if(!query)return;
            setLoading(true);
            const allArticles: Article[]= await fetchNews(category);
            const filteredArticles = allArticles.filter((article) => {
                const title = article.title?.toLowerCase() || '';
                const desc = article.description?.toLowerCase() || '';
                return title.includes(query.toLowerCase()) || desc.includes(query.toLowerCase());
            })
            setResults(filteredArticles);
            setLoading(false);
        }
        loadResults();
    },[query])

  return (
    <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Search results for `{query}`</h1>
        {
            loading ? (
                <p>Loading....</p>) :
                results.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        {results.map((article, index) => (
                            <NewsCard key={index} article={article} />
                        ))}
                        </div>
                ): (
                    <p>No results found.</p>
                )}
    </div>
  );
}

export default SearchResults