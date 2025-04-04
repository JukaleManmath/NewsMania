import React from "react";

interface Article{
    title: string;
}

const BreakingNewsBanner: React.FC<{ articles: Article[]}> = ({articles}) => {
    return(
        <div className="bg-red-600 text-white py-2 overflow-hidden relative flex items-center space-x-4 px-4">
            <div className="font-semibold whitespace-nowrap mr-6">
                🔥 BREAKING NEWS
            </div>
            <div className="overflow-hidden relative flex-1">
                <div className="flex space-x-16 animate-marquee whitespace-nowrap">
                    {[...articles, ...articles].map((article, index)=> (
                        <span key={index} className="text-sm font-medium">
                            {article.title}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BreakingNewsBanner;