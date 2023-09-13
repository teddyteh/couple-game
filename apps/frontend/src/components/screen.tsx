import { ReactNode } from "react";
import { FooterComponent } from "./footer";
import { LogoComponent } from "./logo";

export const ScreenComponent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="screen-section">
      <LogoComponent />
      {children}
      <FooterComponent />
    </div>
  );
};
