import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { save } from '@tauri-apps/plugin-dialog';
import { writeFile } from '@tauri-apps/plugin-fs';
import { isTauri } from '@tauri-apps/api/core';

export interface ExportResult {
  success: boolean;
  message: string;
}

// Attempt to save a Blob via the Tauri dialog API.
// Falls back to a simulated anchor-click download when the API is unavailable
// (e.g. in a browser environment).
async function saveWithPicker(
  blob: Blob,
  suggestedName: string,
  description: string,
  extensions: string[]
): Promise<ExportResult> {
  // Check if we are running in Tauri
  if (isTauri()) {
    try {
      const filePath = await save({
        defaultPath: suggestedName,
        filters: [
          {
            name: description,
            extensions: extensions.map(ext => (ext.startsWith('.') ? ext.slice(1) : ext))
          }
        ]
      });

      if (!filePath) {
        return { success: false, message: 'Save cancelled' };
      }

      const arrayBuffer = await blob.arrayBuffer();
      await writeFile(filePath, new Uint8Array(arrayBuffer));
      return { success: true, message: `Saved as ${suggestedName}` };
    } catch (err) {
      console.error('Tauri save failed:', err);
      return {
        success: false,
        message: `Save failed: ${err instanceof Error ? err.message : String(err)}`
      };
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
  const isExporting = ref(false);

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
      return await saveWithPicker(blob, `${filename}.xlsx`, 'Excel Spreadsheet', ['xlsx']);
    } catch (err) {
      console.error(err);
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
      return await saveWithPicker(blob, `${filename}.csv`, 'CSV File', ['csv']);
    } catch (err) {
      console.error(err);
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
      return await saveWithPicker(blob, `${safeName}.pdf`, 'PDF Document', ['pdf']);
    } catch (err) {
      console.error(err);
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
      return await saveWithPicker(blob, `${safeName}.html`, 'HTML File', ['.html', 'htm']);
    } catch (err) {
      console.error(err);
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

    try {
      // Await the blob eagerly so a null result (canvas.toBlob failure) is caught
      // immediately in the outer try/catch before any clipboard interaction.
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(b => {
          if (b) resolve(b);
          else reject(new Error('Canvas toBlob failed'));
        }, 'image/png');
      });

      try {
        // Safari requires ClipboardItem to be created synchronously with the user
        // gesture; it accepts a Promise<Blob> so we wrap the resolved blob.
        const item = new ClipboardItem({ 'image/png': Promise.resolve(blob) });
        await navigator.clipboard.write([item]);
        return true;
      } catch {
        // Fallback for browsers that don't support Promises in ClipboardItem (e.g. older Chrome).
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        return true;
      }
    } catch (err) {
      console.error('Clipboard write failed:', err);
      return false;
    }
  };

  return {
    isExporting,
    exportToExcel,
    exportToCSV,
    exportToPDF,
    exportToHTML,
    copyChart
  };
}
