import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface props {
  options: string[];
  placeholder: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const DropDown = ({
  options,
  placeholder,
  selected,
  setSelected,
}: props) => {
  const [isOpen, setIsOpen] = useState<true | false>(false);

  return (
    <div className="w-full">
      <div className="relative w-full">
        <div
          className="text-md text-neutral-200 border-2 border-neutral-950 bg-neutral-900 rounded-lg p-[8px] cursor-pointer hover:bg-neutral-800 hover:border-neutral-400 transition-colors duration-200 active:bg-neutral-800 "
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {selected || (
            <p className="text-neutral-500">{placeholder || "Select an option"}</p>
          )}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0.5, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="absolute w-full mt-2 bg-neutral-900 border-2 border-neutral-800 shadow-lg p-2 rounded-lg z-20 max-h-80 overflow-y-scroll hide-scrollbar"
            >
              {options.map((option, index) => (
                <motion.div className="rounded-lg" key={index}
                 initial={{ opacity: 0.5, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}>
                  <motion.div
                  
                    className="text-neutral-200 p-2 hover:bg-neutral-800 rounded-lg transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
