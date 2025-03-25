import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewsCategory from "./pages/NewsCategory";
import Navbar from "./components/Navbar";
import SearchResults from "./pages/SearchResults";
import AuthCallback from "./pages/AuthCallback";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<NewsCategory />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
