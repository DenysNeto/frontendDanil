const logoModules = import.meta.glob('../../assets/logos/*.svg', { eager: true, as: 'url' });
const logoUrls = Object.values(logoModules);

export default function LogoGallery() {
  const duplicatedLogos = [...logoUrls, ...logoUrls];
  
  return (
    <div className="-mx-4 [background:#E6F0F5] overflow-hidden">
      <div className="max-w-4xl ml-1/2 mx-auto overflow-hidden">
        <div 
          className="flex gap-8"
          style={{
            animation: 'scroll 30s linear infinite',
            width: 'max-content'
          }}
          onMouseEnter={(e) => e.target.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.target.style.animationPlayState = 'running'}
        >
          {duplicatedLogos.map((src, index) => (
            <div key={index} className="w-20 h-20 flex items-center justify-center flex-shrink-0">
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