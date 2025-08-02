import React from "react";

// Safe Tailwind class mapping
const colorClasses = {
  blue: {
    bg: "bg-blue-500",
    bgLight: "bg-blue-500/3",
    border: "border-blue-500/20",
    text: "text-blue-600",
  },
  pink: {
    bg: "bg-pink-500",
    bgLight: "bg-pink-500/3",
    border: "border-pink-500/20",
    text: "text-pink-600",
  },
  green: {
    bg: "bg-green-500",
    bgLight: "bg-green-500/3",
    border: "border-green-500/20",
    text: "text-green-600",
  },
  // add more colors if needed
};

const Box = ({
  title,
  img,
  subTitle,
  backgound = "blue",
  border = "blue",
}) => {
  const bg = colorClasses[backgound] || colorClasses.blue;
  const br = colorClasses[border] || colorClasses.blue;

  return (
    <div className={`flex gap-4 ${bg.bgLight} p-5 rounded-xl border ${br.border} items-center`}>
      <div className={`${bg.bg} rounded-full h-9 w-9 flex items-center justify-center text-white`}>
        {img}
      </div>
      <div className="flex flex-col">
        <div className={`${bg.text} text-xs font-semibold`}>{title}</div>
        <div className="font-bold text-lg">{subTitle}</div>
      </div>
    </div>
  );
};

export default Box;
