import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function AuthCallback() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const queryParams = new URLSearchParams(location.search)
      const token = queryParams.get("token")

      if(token){
        localStorage.setItem("token", token);
        navigate("/");
      }else{
        navigate("/login")
      }
    }, [location, navigate])
    
    
  return (
    <div className='text-center ,t-20 text-lg'>
        Logging you in...
    </div>
  );
};

export default AuthCallback