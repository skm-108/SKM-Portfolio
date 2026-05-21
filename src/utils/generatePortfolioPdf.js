import { profile } from '../Data/profile';

export const PDF_FILENAME = 'Shivam_Kumar_Mishra_Portfolio.pdf';
export const PDF_DOWNLOAD_EVENT = 'portfolio:download-pdf';

/** A4 at 96 DPI — matches print width for crisp layout */
export const PDF_PAGE_WIDTH_PX = 794;
export const PDF_PAGE_HEIGHT_PX = 1123;

const JPEG_QUALITY = 0.88;
const CANVAS_SCALE = 1.75;

export function requestPortfolioPdfDownload() {
  window.dispatchEvent(new CustomEvent(PDF_DOWNLOAD_EVENT));
}

const waitForImages = (root) => {
  const images = [...root.querySelectorAll('img')];
  return Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => resolve();
          setTimeout(resolve, 4000);
        })
    )
  );
};

const sliceCanvasToPdf = (doc, canvas, pageWidth, pageHeight, isFirstPage) => {
  const pageWidthPx = pageWidth;
  const pageHeightPx = pageHeight;
  const sliceHeight = Math.floor((canvas.width / pageWidthPx) * pageHeightPx);
  let offsetY = 0;
  let pageIndex = 0;

  while (offsetY < canvas.height) {
    const height = Math.min(sliceHeight, canvas.height - offsetY);
    const slice = document.createElement('canvas');
    slice.width = canvas.width;
    slice.height = height;
    const ctx = slice.getContext('2d');
    ctx.drawImage(canvas, 0, offsetY, canvas.width, height, 0, 0, canvas.width, height);

    const imgData = slice.toDataURL('image/jpeg', JPEG_QUALITY);
    const renderHeight = (height * pageWidthPx) / canvas.width;

    if (!isFirstPage || pageIndex > 0) {
      doc.addPage();
    }

    doc.addImage(imgData, 'JPEG', 0, 0, pageWidthPx, renderHeight, undefined, 'FAST');
    offsetY += sliceHeight;
    pageIndex += 1;
  }
};

/**
 * @param {HTMLElement} root
 * @param {(progress: number) => void} [onProgress]
 */
export async function generatePortfolioPdf(root, onProgress) {
  if (!root) {
    throw new Error('PDF export root not found');
  }

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf')
  ]);

  const pages = [...root.querySelectorAll('.pdf-export-page')];
  if (pages.length === 0) {
    throw new Error('No PDF pages to export');
  }

  await document.fonts?.ready?.catch(() => {});
  await waitForImages(root);

  const doc = new jsPDF({
    unit: 'px',
    format: [PDF_PAGE_WIDTH_PX, PDF_PAGE_HEIGHT_PX],
    compress: true,
    hotfixes: ['px_scaling']
  });

  doc.setProperties({
    title: `${profile.name} — Portfolio`,
    subject: 'AI/ML Engineering Portfolio',
    author: profile.name,
    keywords: 'AI, ML, RAG, Cybersecurity, Portfolio',
    creator: 'SKM Portfolio'
  });

  let isFirstPdfPage = true;

  for (let i = 0; i < pages.length; i += 1) {
    onProgress?.(Math.round((i / pages.length) * 90));

    const pageEl = pages[i];
    const canvas = await html2canvas(pageEl, {
      scale: CANVAS_SCALE,
      backgroundColor: '#030712',
      useCORS: true,
      logging: false,
      width: PDF_PAGE_WIDTH_PX,
      windowWidth: PDF_PAGE_WIDTH_PX
    });

    sliceCanvasToPdf(doc, canvas, PDF_PAGE_WIDTH_PX, PDF_PAGE_HEIGHT_PX, isFirstPdfPage);
    isFirstPdfPage = false;
  }

  onProgress?.(100);
  doc.save(PDF_FILENAME);
}
