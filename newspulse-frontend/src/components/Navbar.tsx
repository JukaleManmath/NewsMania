import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import type { JwtPayload } from "../utils/auth";
import { motion } from "framer-motion";

const Navbar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  const [user, setUser] = useState<JwtPayload | null>(null);
  
  useEffect(() => {
    const userData = getUserFromToken();
    setUser(userData);
  }, []);
  

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if(trimmedQuery){
      const currentpath = window.location.pathname;
      const categoryMatch = currentpath.match(/\/category\/(\w+)/);
      const category = categoryMatch ? categoryMatch[1] : 'general';

      navigate(`/search?q=${encodeURI(query)}&category=${category}`)
      setSearch("");
    }
    
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }
  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          NewsPulse
        </Link>
        <div className="flex space-x-4">
          <input
          type="text"
          placeholder="Search"
          className="bg-white text-black rounded px-2 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          /> 
          <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={() => handleSearch(search)}>Search</button>
          <Link to="/category/technology" className="text-white hover:underline">
            Technology
          </Link>
          <Link to="/category/sports" className="text-white hover:underline">
            Sports
          </Link>
          <Link to="/category/business" className="text-white hover:underline">
            Business
          </Link>
          <Link to="/category/entertainment" className="text-white hover:underline">
            Entertainment
          </Link>
          {user ? (
            <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {user.picture && (
              <motion.img
                src={user.picture}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}
        
            <motion.div
              className="flex flex-col text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-gray-300">Hello,</span>
              <span className="font-semibold">{user.name || user.sub}</span>
            </motion.div>
        
            <motion.button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </motion.div>
          ): (
            <a href="http://localhost:8000/auth/google/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
          </a>
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
