import { requestPortfolioPdfDownload } from '../utils/generatePortfolioPdf';

const PortfolioPdfButton = ({
  className = '',
  label = 'Download Portfolio PDF',
  compact = false
}) => (
  <button
    type="button"
    onClick={() => requestPortfolioPdfDownload()}
    className={
      className ||
      'inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white'
    }
    aria-label={label}
  >
    {!compact && (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 3v12m0 0l4-4m-4 4L8 11" />
        <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
      </svg>
    )}
    {label}
  </button>
);

export default PortfolioPdfButton;
