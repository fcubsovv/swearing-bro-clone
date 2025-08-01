import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
type MenuState = {
  id: number;
  open: boolean;
};

interface ChatLabelProps {
  openMenu: MenuState;
  setOpenMenu: (newValue: MenuState) => void;
}

const ChatLabel = ({ openMenu, setOpenMenu }: ChatLabelProps) => {
  return (
    <div className="flex items-center justify-between p-2 text-text-dark/80 hover:bg-primary/10 rounded-lg text-sm group cursor-pointer ">
      <p className="group-hover:max-w-5/6 translate ">ChatName</p>
      <div className="group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-light-sidebar/40 rounded-lg">
        <Image
          src={assets.three_dots}
          alt=""
          className={`w-4 ${
            openMenu.open ? "block" : "hidden"
          } group-hover:block`}
        />
        <div
          className={`absolute ${
            openMenu.open ? "" : "hidden"
          } -right-36 top-6 bg-light rounded-xl w-max p-2 shadow-lg`}
        >
          <div className="flex items-center gap-3 hover:bg-black/10 px-3 py-2 rounded-lg">
            <Image src={assets.pencil_icon} alt="" className="w-4" />
            <p>Rename</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-black/10 px-3 py-2 rounded-lg">
            <Image src={assets.delete_icon} alt="" className="w-4" />
            <p>Detele</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLabel;
