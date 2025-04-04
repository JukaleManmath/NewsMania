import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewsCategory from "./pages/NewsCategory";
import Navbar from "./components/Navbar";
import SearchResults from "./pages/SearchResults";
import AuthCallback from "./pages/AuthCallback";
import SavedArticles from "./pages/SavedArticles";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<NewsCategory />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/saved" element={<SavedArticles/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
