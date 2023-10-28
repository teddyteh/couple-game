import { Image } from "@/components/atoms/Image";

type Payload = {
  small: boolean;
};

export const Logo = ({ small }: Payload) => {
  return (
    <Image
      src="/logo-color.svg"
      alt="Couple Trivia Logo"
      small={small}
    />
  );
};
