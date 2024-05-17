import { useActiveSection } from "@/contexts/ActiveSectionContext";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  const { activeSection, setActiveSection } = useActiveSection();
  return (
    <div className="flex flex-col items-center justify-start h-[auto] w-fit px-2 mr-4 bg-[#0d0f14]">
      <div className="flex flex-col">
        <div
          className={`flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 my-4 ${
            activeSection === "profile" ? "border-b-4 border-indigo-500" : ""
          }`}
          onClick={() => setActiveSection("profile")}
        >
          <img
            src="/profileIcon.svg"
            width="32px"
            height="32px"
            alt="profile icon"
          />
          Profile
        </div>
        <div
          className={`flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 my-4 ${
            activeSection === "erc20" ? "border-b-4 border-indigo-500" : ""
          }`}
          onClick={() => setActiveSection("erc20")}
        >
          <img
            src="/coinIcon.svg"
            width="32px"
            height="32px"
            alt="profile icon"
          />
          ERC20
        </div>
      </div>
    </div>
  );
};

export default Navbar;
