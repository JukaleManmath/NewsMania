import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface Article {
  title: string;
  urlToImage: string;
  url: string;
}

const animation = { duration: 5000, easing: (t: number) => t };

const BreakingNewsSlider: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(slider) {
      slider.moveToIdx(1, true, animation);
    },
    updated(slider) {
      slider.moveToIdx(slider.track.details.abs + 1, true, animation);
    },
    animationEnded(slider) {
      slider.moveToIdx(slider.track.details.abs + 1, true, animation);
    },
  });

  if (!articles.length) return null;

  return (
    <div className="w-full h-[300px] overflow-hidden bg-black">
      <div ref={sliderRef} className="keen-slider w-full h-full">
        {articles.map((article, index) => (
          <div
            key={index}
            className="keen-slider__slide w-full h-full relative"
          >
            <img
              src={article.urlToImage || "/fallback.jpg"}
              alt={article.title}
              className="w-full h-full object-cover"
            />
  
            <div className="absolute bottom-0 left-0 w-full h-full flex items-end bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-lg font-semibold opacity-70 hover:underline z-20"
              >
                {article.title}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )};
  

export default BreakingNewsSlider;
