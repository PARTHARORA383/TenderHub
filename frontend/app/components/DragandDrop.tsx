
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "motion/react";


export function DragandDrop() {
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedfile, setSelectedfile] = useState<File | null>(null);
  const [error, setError] = useState(false);


  const handledrop = (e: any) => {
    setLoading(true);
    setSelectedfile(null);
    e.preventDefault();

    let file;
    if (e.dataTransfer) {
      file = e.dataTransfer.files[0];
    } else if (e.target.files) {
      setDragOver(true);
      file = e.target.files[0];
    }

    if (file && file.type === "application/jpeg") {
      setSelectedfile(file);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 1500);
    }
  };

  return (<>

  <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeIn" }}
  className="text-center mb-6"
>
  <h2 className="text-3xl font-semibold text-neutral-100">
    Upload your company logo
  </h2>
  <p className=" text-neutral-400 mt-2">
    This will be shown on your company profile and listings.
  </p>
</motion.div>

    <motion.div 
     initial={{ opacity: 0, y: 10 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.3, ease: "easeIn" }}
     className="bg-neutral-900 w-[500px] rounded-lg p-6 text-neutral-50"
     >
      <div className="text-xl font-medium text-start">Upload Profile</div>

      <div
        onDragOver={(e) => {
          setDragOver(true);
          e.preventDefault();
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handledrop}
        className={`mt-8 p-10 py-16 rounded-md text-center cursor-pointer border-2 border-dashed transition-all duration-300 ${
          dragOver
          ? "bg-gradient-to-b bg-neutral-700 to-neutral-800 border-neutral-600"
          : "border-neutral-700 bg-neutral-800"
          }`}
          >
        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <motion.div className="w-10 h-10 rounded-full border-[3px]  border-[#6D8F77] border-t-transparent animate-spin" />
            <div className="text-neutral-300 text-md mt-3 mb-6">
              Uploading your file
            </div>
          </div>
        ) : selectedfile ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-neutral-200 font-medium text-lg mt-3">
              {selectedfile.name}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl border-2 p-2 neutral-900 border-neutral-300 rounded-full">
              <FaArrowUp />
            </div>
            <p className="text-neutral-200 font-medium text-lg mt-3">
              Select a Image file to upload
            </p>
            <span className="text-neutral-400 font-medium">
              or drag and drop file here
            </span>
            {error && (
              <div className="text-red-500 font-medium mt-2">
                Please upload a .jpeg or .png file
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 mb-4 flex items-center justify-center rounded-md">
        <div className="min-w-3xs max-w-3xs rounded-md bg-neutral-200 py-1.5 hover:bg-neutral-100 transition-colors duration-300 relative text-neutral-950">
          <button className="w-full">Browse</button>
          <input
            type="file"
            onChange={handledrop}
            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
            />
        </div>
      </div>
    </motion.div>
            </>
  );
}
