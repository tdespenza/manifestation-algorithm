import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

export interface ExportResult {
  success: boolean;
  message: string;
}

// Attempt to save a Blob via the File System Access API (save dialog).
// Falls back to a simulated anchor-click download when the API is unavailable
// (e.g. WKWebView on macOS, Firefox).
async function saveWithPicker(
  blob: Blob,
  suggestedName: string,
  description: string,
  extensions: string[]
): Promise<ExportResult> {
  type ShowSaveFilePicker = (opts: {
    suggestedName: string;
    types: Array<{ description: string; accept: Record<string, string[]> }>;
  }) => Promise<FileSystemFileHandle>;

  const picker = (window as Window & { showSaveFilePicker?: ShowSaveFilePicker })
    .showSaveFilePicker;

  if (picker) {
    try {
      const mimeType = blob.type.split(';')[0];
      const handle = await picker({
        suggestedName,
        types: [{ description, accept: { [mimeType]: extensions } }]
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return { success: true, message: `Saved as ${suggestedName}` };
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        // User closed the picker — treat as cancelled, not an error
        return { success: false, message: 'Save cancelled' };
      }
      // Fall through to legacy download
    }
  }

  // Legacy fallback: trigger browser/webview download to Downloads folder
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = suggestedName;
  link.click();
  URL.revokeObjectURL(url);
  return { success: true, message: `${suggestedName} saved to Downloads` };
}

export function useChartExport() {
  const isPrinting = ref(false);
  const isExporting = ref(false);

  const printChart = (elementId: string, title: string): ExportResult => {
    const el = document.getElementById(elementId);
    if (!el) return { success: false, message: 'Chart element not found' };

    document.body.classList.add('printing-chart');
    el.classList.add('print-target');

    const originalTitle = document.title;
    document.title = title;

    window.print();

    document.title = originalTitle;
    document.body.classList.remove('printing-chart');
    el.classList.remove('print-target');
    return { success: true, message: 'Print dialog opened' };
  };

  const exportToExcel = async (
    data: Record<string, unknown>[],
    filename: string,
    sheetName = 'Data'
  ): Promise<ExportResult> => {
    try {
      isExporting.value = true;
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      return await saveWithPicker(blob, `${filename}.xlsx`, 'Excel Spreadsheet', ['.xlsx']);
    } catch {
      return { success: false, message: 'Excel export failed' };
    } finally {
      isExporting.value = false;
    }
  };

  const exportToCSV = async (
    data: Record<string, unknown>[],
    filename: string
  ): Promise<ExportResult> => {
    if (!data.length) return { success: false, message: 'No data to export' };
    try {
      isExporting.value = true;
      const headers = Object.keys(data[0]);
      const rows = data.map(row =>
        headers.map(h => {
          const val = String(row[h] ?? '');
          return val.includes(',') || val.includes('"') || val.includes('\n')
            ? `"${val.replace(/"/g, '""')}"`
            : val;
        })
      );
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      return await saveWithPicker(blob, `${filename}.csv`, 'CSV File', ['.csv']);
    } catch {
      return { success: false, message: 'CSV export failed' };
    } finally {
      isExporting.value = false;
    }
  };

  const exportToPDF = async (elementId: string, title: string): Promise<ExportResult> => {
    const el = document.getElementById(elementId);
    if (!el) return { success: false, message: 'Chart element not found' };

    const canvas = el.querySelector('canvas');
    if (!canvas) return { success: false, message: 'No chart canvas found' };

    try {
      isExporting.value = true;
      const imgData = canvas.toDataURL('image/png');

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Fit the image on an A4 page (595 x 842 pt) with a small margin
      const pageWidth = 595;
      const pageHeight = 842;
      const margin = 40;
      const maxW = pageWidth - margin * 2;
      const maxH = pageHeight - margin * 2 - 30; // reserve space for title
      const scale = Math.min(maxW / imgWidth, maxH / imgHeight, 1);
      const drawW = imgWidth * scale;
      const drawH = imgHeight * scale;

      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      doc.setFontSize(16);
      doc.text(title, margin, margin);
      doc.addImage(imgData, 'PNG', margin, margin + 20, drawW, drawH);

      const arrayBuf = doc.output('arraybuffer');
      const blob = new Blob([arrayBuf], { type: 'application/pdf' });
      const safeName = title.replace(/\s+/g, '_');
      return await saveWithPicker(blob, `${safeName}.pdf`, 'PDF Document', ['.pdf']);
    } catch {
      return { success: false, message: 'PDF export failed' };
    } finally {
      isExporting.value = false;
    }
  };

  const exportToHTML = async (elementId: string, title: string): Promise<ExportResult> => {
    const el = document.getElementById(elementId);
    if (!el) return { success: false, message: 'Chart element not found' };

    try {
      isExporting.value = true;
      const canvas = el.querySelector('canvas');
      const imgSrc = canvas ? canvas.toDataURL('image/png') : '';

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 40px; background: #fff; }
    h1 { color: #0a1f7d; }
    img { max-width: 100%; border: 1px solid #ddd; border-radius: 8px; margin-top: 20px; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  ${imgSrc ? `<img src="${imgSrc}" alt="${title}" />` : '<p>No chart image available.</p>'}
</body>
</html>`;

      const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
      const safeName = title.replace(/\s+/g, '_');
      return await saveWithPicker(blob, `${safeName}.html`, 'HTML File', ['.html', '.htm']);
    } catch {
      return { success: false, message: 'HTML export failed' };
    } finally {
      isExporting.value = false;
    }
  };

  const copyChart = async (elementId: string): Promise<boolean> => {
    const el = document.getElementById(elementId);
    if (!el) return false;

    const canvas = el.querySelector('canvas');
    if (!canvas) return false;

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        if (!blob) {
          resolve(false);
          return;
        }
        navigator.clipboard
          .write([new ClipboardItem({ 'image/png': blob })])
          .then(() => resolve(true))
          .catch(() => resolve(false));
      }, 'image/png');
    });
  };

  return {
    isPrinting,
    isExporting,
    printChart,
    exportToExcel,
    exportToCSV,
    exportToPDF,
    exportToHTML,
    copyChart
  };
}
