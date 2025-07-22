import Confetti from "react-confetti";
import { useEffect, useState } from "react";

const SuccessConfetti = () => {
  const [dimensions, setDimensions] = useState({
    width: document.documentElement.clientWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: document.documentElement.clientWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={200}
      recycle={false}
      gravity={0.3}
    />
  );
};

export default SuccessConfetti;
