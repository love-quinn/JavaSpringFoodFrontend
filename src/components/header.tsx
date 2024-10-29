import AddProductSheet from "./add-product-sheet";
import { ModeToggle } from "./mode-toogle";

const Header = () => {
  return (
    <>
      <div className="sticy top-0 z-50 w-full border-b-2 border-border/40 bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex bg-blue max-w-screen-4xl items-center justify-between px-8 lg:px-20">
          <h1>Restaurant</h1>
          <div className="flex gap-2">
          <AddProductSheet />
          <ModeToggle />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Header;
