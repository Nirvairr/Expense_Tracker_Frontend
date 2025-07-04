/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="flex flex-col items-center">
        {" "}
        {/* New wrapper div */}
        <motion.div
          animate={{
            rotate: 360,
            transition: { repeat: Infinity, ease: "linear", duration: 1 },
          }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
        <h3 className="mt-4 text-lg font-semibold text-gray-700">
          Please wait
        </h3>{" "}
        {/* Added margin-top for spacing */}
      </div>
    </div>
  );
};

export default Loader;
