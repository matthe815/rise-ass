interface IModalParameters {
  children: any[];
}

export default function Modal({ children }: IModalParameters) {
  return (
    <div className="layer">
      <div className="builder-window">{children}</div>
    </div>
  );
}
