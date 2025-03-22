import "./Loader.css";

interface LoaderProps {
  size?: number;
}

export const Loader = ({ size = 40 }: LoaderProps) => {
  return (
    <div
      className="loader"
      style={{ width: size, height: size, borderWidth: size * 0.1 }}
    ></div>
  );
};
