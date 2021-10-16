import { getUserTokenStatus } from "@/service/user";
import storage from "@/utils/storage";
import { useState, useEffect } from 'react';


export async function useToken() {
  const token = storage.get('token')
  if(!token){
    return false
  }
  const res = await getUserTokenStatus(token);
  console.log(res);
  if (res.code == 2000) {
    return false;
  }
  return token;
}



export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    }
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, []);

  return scrollPosition;
}






