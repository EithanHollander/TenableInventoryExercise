import "./TryAgain.css";

interface TryAgainProps {
  onButtonClick: () => void;
}
export const TryAgain = ({ onButtonClick }: TryAgainProps) => {
  return (
    <div className="try-again">
      <p className="try-again-message">Failed to load products.</p>
      <button className="try-again-button" onClick={onButtonClick}>
        Retry
      </button>
    </div>
  );
};
