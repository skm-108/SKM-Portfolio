import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PortfolioPdfDocument from './PortfolioPdfDocument';
import {
  PDF_DOWNLOAD_EVENT,
  generatePortfolioPdf
} from '../utils/generatePortfolioPdf';

const PortfolioPdfExporter = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const runExport = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setProgress(0);
    setError('');

    try {
      const root = document.getElementById('portfolio-pdf-export');
      await generatePortfolioPdf(root, setProgress);
    } catch (err) {
      console.error(err);
      setError('Could not generate PDF. Please try again.');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }, [loading]);

  useEffect(() => {
    const handler = () => runExport();
    window.addEventListener(PDF_DOWNLOAD_EVENT, handler);
    return () => window.removeEventListener(PDF_DOWNLOAD_EVENT, handler);
  }, [runExport]);

  return (
    <>
      <PortfolioPdfDocument />

      <AnimatePresence>
        {loading && (
          <motion.div
            className="pdf-loading-overlay"
            role="status"
            aria-live="polite"
            aria-busy="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="pdf-loading-card">
              <div className="pdf-loading-spinner" aria-hidden="true" />
              <p className="pdf-loading-title">Generating portfolio PDF</p>
              <p className="pdf-loading-sub">
                Rendering pages with images & styling… {progress > 0 ? `${progress}%` : ''}
              </p>
              <div className="pdf-loading-bar">
                <motion.span
                  className="pdf-loading-bar-fill"
                  initial={{ width: '8%' }}
                  animate={{ width: `${Math.max(8, progress)}%` }}
                  transition={{ duration: 0.25 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && !loading && (
          <motion.div
            className="pdf-error-toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => setError('')}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioPdfExporter;
