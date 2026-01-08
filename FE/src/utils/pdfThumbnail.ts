import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Đường dẫn worker cho pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

/**
 * Sinh thumbnail cho từng trang PDF (dataURL PNG)
 * @param fileOrUrl File hoặc Blob PDF hoặc URL PDF
 * @param numPages Số trang PDF
 * @param options { initialCount: số trang render trước, width: chiều rộng thumbnail }
 * @returns Promise<{ thumbnails: (string|undefined)[], lazyRender: (pageIndex: number) => Promise<string> }>
 */
export async function generatePdfThumbnails(
    fileOrUrl: File | Blob | string,
    numPages: number,
    options: { initialCount?: number; width?: number } = {}
): Promise<{ thumbnails: (string|undefined)[], lazyRender: (pageIndex: number) => Promise<string> }>
{
    const initialCount = options.initialCount ?? 10;
    const width = options.width ?? 180;
    let pdf: any;
    if (typeof fileOrUrl === 'string') {
        pdf = await pdfjsLib.getDocument({ url: fileOrUrl }).promise;
    } else {
        const arrayBuffer = await fileOrUrl.arrayBuffer();
        pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    }
    const thumbnails: (string|undefined)[] = new Array(numPages).fill(undefined);

    // Render trước initialCount trang đầu
    for (let i = 0; i < Math.min(initialCount, numPages); i++) {
        thumbnails[i] = await renderPageThumbnail(pdf, i + 1, width);
    }

    // Hàm render lazy cho từng trang
    async function lazyRender(pageIndex: number): Promise<string> {
        if (thumbnails[pageIndex]) return thumbnails[pageIndex]!;
        const dataUrl = await renderPageThumbnail(pdf, pageIndex + 1, width);
        thumbnails[pageIndex] = dataUrl;
        return dataUrl;
    }

    return { thumbnails, lazyRender };
}

async function renderPageThumbnail(pdf: any, pageNum: number, width: number): Promise<string> {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1 });
    const scale = width / viewport.width;
    const scaledViewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    return canvas.toDataURL('image/png');
} 