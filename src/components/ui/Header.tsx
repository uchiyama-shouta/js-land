import type { VFC } from "react";

import Logo from "src/components/ui/Logo";

const Header: VFC = () => {
  return (
    <div className="flex-grow">
      <header className="box-border flex fixed top-0 right-0 left-auto z-50 flex-col flex-shrink-0 w-full bg-white shadow-md">
        <div className="flex relative items-center px-4 sm:px-6 ml-5 min-h-[56px] sm:min-h-[64px]">
          <Logo />
        </div>
      </header>
    </div>
  );
};

export default Header;
