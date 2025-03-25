import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/news/";

export const fetchNews = async (category: string = "general") => {
    try{
        const response = await axios.get(`${API_URL}?country=us&category=${category}`);
        return response.data.articles;
    } catch(error){
        console.error("Error fetching news:", error);
        return [];
    }

};

