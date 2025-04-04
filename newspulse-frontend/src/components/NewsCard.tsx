import { useState } from "react";


interface Article{
        title: string;
        description: string;
        url: string;
        category?: string;
        urlToImage?: string;
        publishedAt?: string;
        source?: { name?: string};
}

interface NewsProps{
    article: Article;
    isSavedView?: boolean;
    onRemove?: (url:string) => void;
}

const NewsCard: React.FC<NewsProps> = ({article, isSavedView = false, onRemove}) => {
    const fallbackImage = "https://via.placeholder.com/400x200?text=No+Image+Available";
    const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

    const handleSave = async () => {
      const token = localStorage.getItem("token");
      if(!token){
        alert("You must be logged in to save the articles");
        return;
      }
      setStatus("saving");
      try{
        const response = await fetch("http://localhost:8000/articles/save",{
          method:'POST',
          headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`,
          },
          body: JSON.stringify({
            title: article.title,
            url: article.url,
            urlToImage: article.urlToImage,
            category: article.category,
            published_at: article.publishedAt,

          }),
        });
        if (response.ok || response.status === 409){
          setStatus("saved");
        }else{
          throw new Error("Failed to save article");
        }
      }catch(error){
        console.error("Save failed:", error);
        setStatus("error");
      }
    };

    
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
      <img
        src={article.urlToImage || fallbackImage}
        alt={article.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="mb-3">
          <h2 className="text-lg font-bold dark:text-gray-100 text-gray-800 line-clamp-2">
            {article.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
            {article.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-xs dark:text-gray-400 text-gray-500">
            {article.source?.name && (
              <span>{article.source.name}</span>
            )}
            {article.publishedAt && (
              <span> · {new Date(article.publishedAt).toLocaleDateString()}</span>
            )}
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Read more →
          </a>
          {isSavedView ? (
            <button 
            onClick={() => onRemove?.(article.url)}
            className="text-sm px-2 py-1 rounded-xl bg-red-500 text-white hover:bg-red-600">
            Remove
            </button>
          ):(
          <button
            onClick={handleSave}
            disabled={status == "saving"}
            className="text-sm px-1 py-1 rounded-xl dark:bg-gray-500 bg-green-500 opacity-70 text-white hover:bg-green-600 disabled:bg-gray-400"
            >
              {status === "saved"
                ? "Saved.."
                : status === "saving"
                ? "Saving..."
                : "Save"}
            </button>)}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;