import { motion } from "framer-motion";

const PageEnterAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2, }}

    >
      {children}
    </motion.div>
  );
};


export {PageEnterAnimation}