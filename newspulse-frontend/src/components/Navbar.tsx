import { useEffect, useState , useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import type { JwtPayload } from "../utils/auth";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";


const Navbar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {isDark, toggleTheme} = useTheme();
  
  useEffect(() => {
    const userData = getUserFromToken();
    setUser(userData);

    const handleClickOutside = (event: MouseEvent) => {
      if(
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ){
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
        <span className="bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
          NewsMania
        </span>
        </Link>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full md:w-auto">
          <input
          type="text"
          placeholder="Search"
          className="bg-white text-black rounded px-2 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          /> 
          <button className="ml-2 px-3 py-1 bg-blue-400 text-white rounded" onClick={() => handleSearch(search)}>Search</button>
          <Link to="/" className="text-white hover:underline">
          Home
          </Link>
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <motion.img
                  src={user.picture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="hidden sm:flex flex-col text-sm text-left">
                  <span className="text-gray-300">Hello,</span>
                  <span className="font-semibold">{user.name || user.sub}</span>
                </div>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 border-b text-sm truncate max-w-[180px]">
                      {user.sub}
                    </div>
                    <Link
                      to="/saved"
                      className="block px-4 py-2 border-b text-sm hover:bg-gray-100 text-gray-800"
                      onClick={() => setDropdownOpen(false)} // optional: close dropdown on click
                    >
                     My News
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <a href="http://localhost:8000/auth/google/login">
              <button className="bg-blue-600 px-3 py-1 rounded text-sm">
                Login
              </button>
            </a>
          )}
            <button
              onClick={toggleTheme}
              className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition"
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
