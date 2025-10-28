const logoModules = import.meta.glob('../../assets/logos/*.svg', { eager: true, as: 'url' });
const logoUrls = Object.values(logoModules);

export default function LogoGallery() {
  const duplicatedLogos = [...logoUrls, ...logoUrls];
  
  return (
    <div className=" h-[120px] absolute w-full overflow-hidden  [background:#E6F0F5]   z-100 ">
      <div className="max-w-7xl  mx-auto overflow-hidden  ">
        <div 
          className="flex gap-8 "
          style={{
            animation: 'scroll 10s linear infinite',
            width: 'max-content'
          }}
          onMouseEnter={(e) => e.target.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.target.style.animationPlayState = 'running'}
        >
          {duplicatedLogos.map((src, index) => (
            <div key={index} className="w-35 h-30 flex items-center justify-center flex-shrink-0 opacity-[60%] ">
              <img src={src} alt={`Logo ${index}`} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `
      }} />
    </div>
  );
}