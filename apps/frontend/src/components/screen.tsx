import { ReactNode } from "react";
import { FooterComponent } from "./footer";
import { LogoComponent } from "./logo";

export const ScreenComponent = ({
  small,
  children,
}: {
  small: boolean;
  children: ReactNode;
}) => {
  return (
    <div className="screen-container">
      <div className="header">
        <LogoComponent small={small} />
      </div>
      <div className="content">{children}</div>
      <FooterComponent small={small} />
    </div>
  );
};
