import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop({scrollbar}) {
  const { pathname } = useLocation();

  useEffect(() => {
    if(scrollbar) scrollbar.scrollTop = 0;
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    // console.log("err")
  }, [pathname]);

  return null;
}