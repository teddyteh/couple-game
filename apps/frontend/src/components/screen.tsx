import { ReactNode } from "react";
import { FooterComponent } from "./footer";
import { LogoComponent } from "./logo";

export const ScreenComponent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="screen-container">
      <div className="header">
        <LogoComponent />
      </div>
      <div className="content">{children}</div>
      <div className="footer">
        <FooterComponent />
      </div>
    </div>
  );
};
