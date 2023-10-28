import { Logo } from "@/components/atoms/Logo";
import { Footer } from "@/components/organisms/Footer";
import { ReactNode } from "react";

export const Screen = ({
  small,
  children,
}: {
  small: boolean;
  children: ReactNode;
}) => {
  return (
    <div className="screen-container">
      <div className="header">
        <Logo small={small} />
      </div>
      <div className="content">{children}</div>
      <Footer small={small} />
    </div>
  );
};
