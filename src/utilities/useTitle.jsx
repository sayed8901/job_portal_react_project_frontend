import { useEffect } from "react";

const useTitle = (title = "") => {
  useEffect(() => {
    const site_name = "BD Job Portal";
    if (title.length > 0) {
      document.title = `${title} - ${site_name}`;
    } else {
      document.title = site_name;
    }
  }, [title]);
};

export default useTitle;
