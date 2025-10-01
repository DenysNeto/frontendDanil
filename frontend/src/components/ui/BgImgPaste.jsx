import React from "react";



export function BgHeader(){
  return (
           <div
  className="absolute left-0 w-full z-[0] pointer-events-none bg-cover bg-center"
  style={{
    backgroundImage: 'url(/e_bg.png)',
    filter: 'blur(40px)',
    backgroundSize: '130%',
    height: '200%',
    top: '0',
  }}
/>
  )
}

export function BgFooter() {
  return (
    <div
      className="fixed  w-full z-[0] pointer-events-none bg-cover bg-center"
      style={{
        backgroundImage: 'url(/e_bg.png)',
        filter: 'blur(40px)',
        backgroundSize: '120%',
        height: '200%',        // запас, чтобы при масштабировании/blur не появлялись углы
        bottom: '0',           // прижимает фон к низу контейнера
        top: 'auto',
      }}
      aria-hidden="true"
    />
  );
}


export function BgContainer({
  src = "/e_bg.png",
  className = "",
}) {
  const style = {
    backgroundImage: `url(${src})`,
    filter: "blur(30px)",
    backgroundSize: "120%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };

  return (
    <div
      className={`absolute left-0 w-full z-[0] pointer-events-none bg-cover bg-center ${className}`}
      style={style}
    />
  );
}