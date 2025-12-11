import { useEffect, useState } from "react";

export default function ResponsiveSVG() {
  const [screenSize, setScreenSize] = useState<"small" | "medium" | "large">("large");

  useEffect(() => {
    const handler = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("small");
      else if (width < 1024) setScreenSize("medium");
      else setScreenSize("large");
    }

    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const pathData = 
  screenSize === "small"
    ? `M 0 0 
       L 800 0
       L 800 410 
       Q 800 460 750 460 
       L 275 460 
       C 260 460 250 485 250 485
       L 225 535
       C 225 535 215 560 200 560
       L 50 560 
       Q 0 560 0 510 
       Z`
  : screenSize === "medium"
    ? `M 0 0 
       L 800 0
       L 800 410 
       Q 800 460 750 460 
       L 275 460 
       C 260 460 250 485 250 485
       L 225 535
       C 225 535 215 560 200 560
       L 50 560 
       Q 0 560 0 510 
       Z`
    : // Path untuk layar besar dengan cekungan di tengah atas
      `M 0 0 
       L 280 0
       Q 290 0 295 5
       Q 300 10 305 20
       L 320 50
       Q 325 60 335 60
       L 465 60
       Q 475 60 480 50
       L 495 20
       Q 500 10 505 5
       Q 510 0 520 0
       L 800 0
       L 800 410 
       Q 800 460 750 460 
       L 275 460 
       C 260 460 250 485 250 485
       L 225 535
       C 225 535 215 560 200 560
       L 50 560 
       Q 0 560 0 510 
       Z`;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 600"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 w-full z-10 h-[93%] sm:h-full"
    >
      <defs>
        <linearGradient id="myGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFCC00" />
          <stop offset="56%" stopColor="#FE8501" />
          <stop offset="100%" stopColor="#E84908" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.4)" />
        </filter>
      </defs>
      <path
        d={pathData}
        fill="url(#myGradient)"
        filter="url(#shadow)"
      />
    </svg>
  );
}