export default function BgImgPaste({
  src = "/e_bg.png",
  className = "",
  position, // "top" | "bot" | undefined
}) {
  // wrapper — обрезающий контейнер
  const wrapperStyle = {
    position: "absolute",
    left: 0,
    width: "100%",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 0,

    height: position === "top" || position === "bot" ? "50%" : "100%",
  };

  if (position === "top") {
    wrapperStyle.top = 0;
    delete wrapperStyle.bottom;
  } else if (position === "bot") {
    wrapperStyle.bottom = 0;
    wrapperStyle.bot = "0"
    delete wrapperStyle.top;
  } else {
    wrapperStyle.top = 0;
    delete wrapperStyle.bottom;
  }

  // inner — сам фон, больше по высоте и сдвинут
  const innerStyle = {
    position: "absolute",
    left: 0,
    top: !position ? "10%" : "0",
    width: "100%",
    height: "80%", 
    backgroundImage: `url(${src})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "100%",
    filter: "blur(30px)",
    transform: position === "bot" ? "translateY(50%)" : position === "top" ? "translateY(-50%)" : "none",
  };

  return 
  
  (
    <div style={wrapperStyle}>
      <div className={`bg-cover bg-center ${className}`} style={innerStyle} />
    </div>
  );
}