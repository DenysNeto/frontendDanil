
//    Template1 = "main"
//    Template2 = "action"
import ScrollButton from "./ScrollButton"
import {BgContainer} from "./BgImgPaste";

const Template = ({ type = "main" ,padding = 2, children ,bgActive = false }) => {
  let resolvedPadding = padding;
  if (type === "main") resolvedPadding = 2
  if (type == "action" ) resolvedPadding = 3

  if (padding === 'm') resolvedPadding = 3;
  else if (padding === 'l') resolvedPadding = 4;
  else if (padding === 'xl') resolvedPadding = 5;
  else if (typeof padding !== 'number' || padding < 0 || padding > 5) resolvedPadding = 2;

  const contentSpan = 24 - resolvedPadding * 2;

  return (
    <div className="grid-24 relative bg-transparent ">
     
      <aside className={`col-${resolvedPadding}`} />
      <main className={`col-${contentSpan} z-12 `}>
        {children}
      </main>
      <aside className={`col-${resolvedPadding}`} />

       {bgActive && <BgContainer /> }
    </div>
  );
};

export default Template;