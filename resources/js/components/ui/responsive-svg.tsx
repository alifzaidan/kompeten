import { useEffect, useState } from "react";

export default function ResponsiveSVG() {
  const [screenSize, setScreenSize] = useState<"small" | "medium" | "large">("large");

  useEffect(() => {
    const handler = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("small");
      else if (width < 1024) setScreenSize("medium");
      else setScreenSize("large");
    };

    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Mobile/Tablet: Tanpa cekungan (lurus saja)
  const mobilePath = `
    M20,0 
    L780,0 
    Q800,0 800,20
    L800,380
    Q800,400 780,400
    L20,400 
    Q0,400 0,380
    L0,20
    Q0,0 20,0
    Z
  `;

  // Desktop: Cekungan lebar & dangkal seperti gambar
  const desktopPath = `
    M20,0 
    L280,0 
    Q290,0 295,20
    Q300,40 320,40
    L480,40
    Q500,40 505,20
    Q510,0 520,0
    L780,0 
    Q800,0 800,20
    L800,380
    Q800,400 780,400
    L20,400 
    Q0,400 0,380
    L0,20
    Q0,0 20,0
    Z
  `;

  const pathData = screenSize === "large" ? desktopPath : mobilePath;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 400"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 w-full z-10 h-full"
      style={{ borderRadius: 40, overflow: "visible" }}
    >
      <defs>
        <clipPath id="heroClip">
          <path d={pathData} />
        </clipPath>
      </defs>
      {/* Gambar object-cover pakai foreignObject + div */}
      <foreignObject
        x="0"
        y="0"
        width="800"
        height="400"
        clipPath="url(#heroClip)"
        style={{ borderRadius: 40, overflow: "hidden" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: "url('/assets/images/hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </foreignObject>
    </svg>
  );
}