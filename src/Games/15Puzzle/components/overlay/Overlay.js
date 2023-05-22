import "./Overlay.css";

const Overlay = ({ size }) =>
  new Array(size)
    .fill()
    .map((_, i) => <div key={i} className="fifpuzzle-overlay" />);

export default Overlay;
