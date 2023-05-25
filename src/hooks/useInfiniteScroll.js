import { useState, useEffect } from "react";

const useInfiniteScroll = (callback, scroller) => {
  const [isFetching, setIsFetching] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    if (scroller.current) {
      scroller.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scroller.current)
        scroller.current.removeEventListener("scroll", handleScroll);
    };
  }, [scroller.current]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function handleScroll() {
    setScrollPosition(scroller.current.scrollTop)
    if (
      scroller.current.clientHeight + scroller.current.scrollTop + 3 <
        scroller.current.scrollHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching, scrollPosition];
};

export default useInfiniteScroll;
