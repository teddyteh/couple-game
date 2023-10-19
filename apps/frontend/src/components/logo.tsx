import { ImageComponent } from "./image";

type Payload = {
  small: boolean;
};

export const LogoComponent = ({ small }: Payload) => {
  return (
    <ImageComponent
      src="/logo-color.svg"
      alt="Couple Trivia Logo"
      small={small}
    />
  );
};
