import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

interface PromBoxProps {
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
}

const PromBox = ({ isLoading, setIsLoading }: PromBoxProps) => {
  const [prompt, setPrompt] = useState("");

  return (
    <form
      className={`w-full ${
        false ? "max-w-3xl" : "max-w-2xl"
      } bg-light-sidebar p-4 rounded-3xl mt-4 transition-all`}
    >
      <textarea
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent"
        rows={2}
        placeholder="Ask ur srupid shit"
        required
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <p className="flex tems-center gap-2 text-xs border border-border-light px-2 py-1 rounded-full cursor-pointer hover:bg-light transition">
            <Image className="h-4" src={assets.deepthink_icon} alt="" />
            DeepThink(R1)
          </p>
          <p className="flex tems-center gap-2 text-xs border border-border-light px-2 py-1 rounded-full cursor-pointer hover:bg-light transition">
            <Image className="h-4" src={assets.search_icon} alt="" />
            Search
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image className="w-4 cursor-pointer" src={assets.pin_icon} alt="" />
          <button
            className={`${
              prompt ? "bg-primary" : "bg-primary/40"
            } rounded-full p-2 cursor-pointer hover:shadow-lg`}
          >
            <Image
              className="w-3.5 aspect-square"
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              alt=""
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromBox;
