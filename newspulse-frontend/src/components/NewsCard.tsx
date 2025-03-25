interface NewsProps{
    article: {
        title: string;
        description: string;
        url: string;
        category?: string;
    };
}

const NewsCard: React.FC<NewsProps> = ({article}) => {
    return(
        <div className="border p-4 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p>{article.description}</p>
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-blue-500"
            >Read more</a>
        </div>
    );
};

export default NewsCard;