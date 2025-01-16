import { useState } from "react";
import "./PrintButton.css";

const PrintButton = ({printInvoice}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);


  return (
    <div className="tooltip-container">
      {/* Button */}
      <div
        className="button-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={printInvoice}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-printer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
          <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
          <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
          <rect x="7" y="13" width="10" height="8" rx="2" />
        </svg>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="tooltip">
          Print this invoice!
        </div>
      )}
    </div>
  );
};

export default PrintButton;
