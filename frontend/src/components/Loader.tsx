import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[120px] scale-150 font-poppins text-white text-2xl font-semibold select-none relative">
      
      <div className="relative flex items-center justify-center">
        {"Generating".split("").map((char, index) => (
          <span
            key={index}
            className="loader-letter"
            style={{ animationDelay: `${0.1 + index * 0.105}s` }}
          >
            {char}
          </span>
        ))}

        <div className="loader absolute top-0 left-0 w-full h-full z-10" />
      </div>

    </div>
  );
};

export default Loader;
