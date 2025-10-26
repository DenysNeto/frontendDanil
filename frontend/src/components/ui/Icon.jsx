import Stripes3 from '/icons/3stripes.svg';
import Cloud from '/icons/cloud.svg';
import CntxLength from '/icons/cntxLength.svg';
import Cube from '/icons/cube.svg';
import FineTune from '/icons/fineTune.svg';
import Price from '/icons/price.svg';

const icons = {
  Stripes3,
  Cloud,
  CntxLength,
  Cube,
  FineTune,
  Price
};


export default function Icon({ name, size = 'medium', ...props }) {
  if (!Object.keys(icons).includes(name)) return null;
  
  const iconSrc = icons[name];
  
  const sizes = {
    small: { width: 18, height: 18 },
    medium: { width: 24, height: 24 },
    large: { width: 32, height: 32 },
    xl: { width: 48, height: 48 }
  };
  
  return (
    <img 
      src={iconSrc} 
      alt={name} 
      style={{ ...sizes[size], ...props.style }}
      {...props}
    />
  );
}