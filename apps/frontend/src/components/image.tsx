export const ImageComponent = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="image-wrapper">
      <img className="image" src={src} alt={alt} />
    </div>
  );
};
