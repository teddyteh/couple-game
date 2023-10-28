type Payload = {
  src: string;
  alt: string;
  small: boolean;
};

export const Image = ({ src, alt, small }: Payload) => {
  return (
    <div className="image-wrapper">
      <img className={`image ${small && "small"}`} src={src} alt={alt} />
    </div>
  );
};
