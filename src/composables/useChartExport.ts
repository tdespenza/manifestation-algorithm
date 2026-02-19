import { ref } from 'vue';
import * as XLSX from 'xlsx';

export function useChartExport() {
  const isPrinting = ref(false);

  const printChart = (elementId: string, title: string) => {
    const el = document.getElementById(elementId);
    if (!el) return;

    // Add print classes
    document.body.classList.add('printing-chart');
    el.classList.add('print-target');

    // Set document title for the print job
    const originalTitle = document.title;
    document.title = title;

    window.print();

    // Cleanup
    document.title = originalTitle;
    document.body.classList.remove('printing-chart');
    el.classList.remove('print-target');
  };

  const exportToExcel = (
    data: Record<string, unknown>[],
    filename: string,
    sheetName: string = 'Data'
  ) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
    if (!data.length) return;
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
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToPDF = (elementId: string, title: string) => {
    const el = document.getElementById(elementId);
    if (!el) return;

    document.body.classList.add('printing-chart');
    el.classList.add('print-target');

    const originalTitle = document.title;
    document.title = title;

    window.print();

    document.title = originalTitle;
    document.body.classList.remove('printing-chart');
    el.classList.remove('print-target');
  };

  const exportToHTML = (elementId: string, title: string) => {
    const el = document.getElementById(elementId);
    if (!el) return;

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
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}.html`;
    link.click();
    URL.revokeObjectURL(url);
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
    printChart,
    exportToExcel,
    exportToCSV,
    exportToPDF,
    exportToHTML,
    copyChart
  };
}
