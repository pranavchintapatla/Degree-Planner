import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//This helper function scrolls to the top of the page when using the useNavigate hook. It is called in the App component to scroll up any time the hook is used

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}