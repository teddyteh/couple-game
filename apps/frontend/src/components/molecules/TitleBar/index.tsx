type Payload = { onClick: () => void; title: string };

export const TitleBar = ({ onClick, title }: Payload) => {
  return (
    <div className="title-bar">
      <button className="default-button transparent" onClick={onClick}>
        <i className="fas fa-arrow-left back-icon"></i>
      </button>
      <h1>{title}</h1>
    </div>
  );
};
