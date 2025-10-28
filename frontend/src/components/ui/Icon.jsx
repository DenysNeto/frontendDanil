import * as IconComponents from '../Icons';

const Icon = ({ name, ...props }) => {
  const Component = IconComponents[name];
  if (!Component) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }
  return <Component {...props} />;
};

export default Icon;