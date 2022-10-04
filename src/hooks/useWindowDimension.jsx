import { useState, useEffect, useCallback } from "react";

export default function useWindowDimension() {
  const [windowSize, setWindowSize] = useState({
    height: null,
    width: null,
  });

  const wrezie = useCallback(() => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", wrezie);
    wrezie();
    return () => {
      window.removeEventListener("resize", wrezie);
    };
  }, [window.innerWidth]);

  return { height: windowSize.height, width: windowSize.width };
}
