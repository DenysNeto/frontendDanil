import { useEffect, useRef, useState } from "react";

export default function BgImgPaste({
  src = "/e_bg.png",
  className = "",
  position, // "top" | "bot" | undefined
}) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current && ref.current.parentElement) {
      const parent = ref.current.parentElement;
      setHeight(parent.offsetHeight);
    }
  }, []);

  const style = {
    backgroundImage: `url(${src})`,
    filter: "blur(30px)",
    backgroundSize: "1800%",
    height: `${ position == "top" || position == "bot" ? "150%" : "100%"} `, // чтобы фон мог "выползти"
  };

  if (position === "top") {
    style.top = "-10px";
  } else if (position === "bot") {
   style.top = "auto";

    style.bottom = "0";
  } else {
    style.top = "0px"; // дефолт
  }

  return (
    <div
      ref={ref}
      className={`absolute left-0 w-full z-[0] pointer-events-none bg-cover bg-center ${className}`}
      style={style}
    />
  );
}