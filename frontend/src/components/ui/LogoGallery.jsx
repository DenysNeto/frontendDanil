const logoModules = import.meta.glob('../../assets/logos/*.svg', { eager: true, as: 'url' });

const logoUrls = Object.values(logoModules);

export default function LogoGallery() {
  return (
    
    <div className="-mx-4 [background:#E6F0F5]">
      <div className="max-w-6xl mx-auto flex flex-no-wrap justify-center items-center gap-8">
        {logoUrls.map((src, index) => (
          <div key={index} className="w-20 h-20 flex items-center justify-center">
            <img src={src} alt={`Logo ${index}`} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}