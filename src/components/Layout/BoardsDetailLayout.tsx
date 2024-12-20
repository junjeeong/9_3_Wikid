import { ReactNode } from "react";

const BoardsDetailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1060px] mx-auto px-[20px] pb-[80px]">{children}</div>
  );
};

export default BoardsDetailLayout;
