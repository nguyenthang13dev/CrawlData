import { ChartConfig } from "@/components/charts/types/Amchart";
import * as am5 from "@amcharts/amcharts5/index";
import ExcelJS from "exceljs";
interface ColumnDefinition {
    header: string;
    key: string;
    width?: number;
    style?: Partial<ExcelJS.Style>;
    headerStyle?: Partial<ExcelJS.Style>; // Specific style for this header
}

interface ExportChartDataOptions {
    data: any[];
    columns: ColumnDefinition[];
    fileName: string;
    sheetName?: string;
    title?: string;
    reportDate?: string; // New: For displaying month/year of the report
    globalHeaderStyle?: Partial<ExcelJS.Style>;
    globalCellStyle?: Partial<ExcelJS.Style>;
    onSuccess?: () => void;
    onError?: (error: any) => void;
}

const defaultHeaderStyle: Partial<ExcelJS.Style> = {
    font: {bold: true, color: {argb: 'FFFFFFFF'}},
    fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: 'FF0070C0'} // Default Blue background
    },
    alignment: {horizontal: 'center', vertical: 'middle'},
    border: {
        top: {style: 'thin', color: {argb: 'FF000000'}},
        left: {style: 'thin', color: {argb: 'FF000000'}},
        bottom: {style: 'thin', color: {argb: 'FF000000'}},
        right: {style: 'thin', color: {argb: 'FF000000'}}
    }
};

const defaultCellStyle: Partial<ExcelJS.Style> = {
    border: {
        top: {style: 'thin', color: {argb: 'FFD0D0D0'}},
        left: {style: 'thin', color: {argb: 'FFD0D0D0'}},
        bottom: {style: 'thin', color: {argb: 'FFD0D0D0'}},
        right: {style: 'thin', color: {argb: 'FFD0D0D0'}}
    },
    alignment: {vertical: 'middle', wrapText: true}
};

/**
 * Helper function to add title, date, and empty row to worksheet
 */
function addTitleAndDateToWorksheet(
    worksheet: ExcelJS.Worksheet,
    title: string,
    dateStr: string,
    columns: ColumnDefinition[] // Changed from columnsLength to the full array
): number {
    let currentRow = 1;
    const columnsLength = columns.length;

    // Title
    if (title) {
        // Add padding spaces to the start and end of the title for visual spacing
        const paddedTitle = `   ${title}   `;
        const titleRow = worksheet.getCell(currentRow, 1);
        titleRow.value = paddedTitle;
        titleRow.font = {bold: true, size: 16, color: {argb: 'FF0070C0'}};
        titleRow.alignment = {horizontal: 'center', wrapText: false};
        worksheet.mergeCells(currentRow, 1, currentRow, columnsLength);

        // Calculate required width for the title (estimate: 1 char ≈ 1.2 width units for 16pt font)
        const requiredWidth = Math.ceil((paddedTitle.length || 1) * 1.2);
        // Calculate current total width of merged columns
        const currentTotalWidth = worksheet.columns.slice(0, columnsLength).reduce((sum, col) => sum + (col.width || 16), 0);
        // If required width is greater, expand columns proportionally
        if (requiredWidth > currentTotalWidth) {
            const extraWidth = requiredWidth - currentTotalWidth;
            const addPerCol = extraWidth / columnsLength;
            worksheet.columns.slice(0, columnsLength).forEach((col, idx) => {
                col.width = (col.width || 16) + addPerCol;
                // Update columns array so later width logic does not overwrite
                columns[idx].width = col.width;
            });
        }

        worksheet.getRow(currentRow).height = 30;
        currentRow++;
    }


    // Date
    if (dateStr) {
        const dateCell = worksheet.getCell(currentRow, 1);
        dateCell.value = dateStr;
        dateCell.font = {italic: true, size: 11, color: {argb: 'FF444444'}};
        dateCell.alignment = {horizontal: 'center'};
        worksheet.mergeCells(currentRow, 1, currentRow, columnsLength);
        currentRow++;
    }


    // Empty row for spacing
    if (title || dateStr) {
        worksheet.getRow(currentRow).height = 10;
        currentRow++;
    }

    return currentRow;
}

/**
 * Helper function to set column widths automatically
 */
function setColumnWidths(
    worksheet: ExcelJS.Worksheet,
    columns: ColumnDefinition[],
    startRowForCalculation: number
) {
    worksheet.columns.forEach((worksheetColumn: any, index: number) => {
        const colDefinition = columns[index];
        if (colDefinition?.width) {
            worksheetColumn.width = colDefinition.width;
        } else {
            // Auto-calculate width
            let maxLength = 0;
            worksheetColumn.eachCell!({includeEmpty: true}, (cell: any, rowNum: number) => {
                if (rowNum >= startRowForCalculation) {
                    const columnLength = cell.value ? cell.value.toString().length : 10;
                    if (columnLength > maxLength) {
                        maxLength = columnLength;
                    }
                }
            });
            worksheetColumn.width = maxLength < 12 ? 12 : maxLength + 3;
            if (worksheetColumn.width > 80) worksheetColumn.width = 80;
        }
        // Always enable wrapText for all columns
        worksheetColumn.alignment = worksheetColumn.alignment || {};
        worksheetColumn.alignment.wrapText = true;
    });
}

/**
 * Helper function to adjust column widths to fit header titles (optional)
 */
function adjustHeaderColumnWidths(worksheet: ExcelJS.Worksheet, columns: ColumnDefinition[], sheetName?: string, minWidth = 12, maxWidth = 80) {
    worksheet.columns.forEach((worksheetColumn: any, index: number) => {
        const colDefinition = columns[index];
        let headerLength = colDefinition && colDefinition.header ? colDefinition.header.toString().length : minWidth;
        // Nếu là cột đầu tiên và có sheetName, lấy độ dài lớn nhất giữa header và sheetName
        if (index === 0 && sheetName) {
            headerLength = Math.max(headerLength, sheetName.length);
        }
        const headerWidth = Math.min(Math.max(headerLength + 2, minWidth), maxWidth);
        if (!colDefinition.width || headerWidth > worksheetColumn.width) {
            worksheetColumn.width = headerWidth;
        }
    });
}

/**
 * Helper function to generate Excel file and trigger download
 */
async function downloadExcelFile(
    workbook: ExcelJS.Workbook,
    fileName: string
): Promise<void> {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}

export const exportChartDataToExcel = async ({
                                                 data,
                                                 columns,
                                                 fileName,
                                                 sheetName = 'Sheet 1',
                                                 title,
                                                 reportDate, // Added new parameter
                                                 globalHeaderStyle,
                                                 globalCellStyle,
                                                 onSuccess,
                                                 onError,
                                             }: ExportChartDataOptions): Promise<void> => {
    if (!data || data.length === 0) {
        console.warn("No data to export.");
        onError?.(new Error("No data to export."));
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    let currentRow = 1;

    // Add title and date using the helper function
    if (title || reportDate) {
        // FIX: Pass the 'columns' array, not its length.
        currentRow = addTitleAndDateToWorksheet(
            worksheet,
            title || '',
            reportDate || '',
            columns // Corrected from columns.length
        );
    }

    // --- Header Row ---
    const headerRow = worksheet.getRow(currentRow);
    headerRow.height = 30;
    columns.forEach((col, index) => {
        const cell = headerRow.getCell(index + 1);
        cell.value = col.header;
        cell.style = {...defaultHeaderStyle, ...globalHeaderStyle, ...col.headerStyle};
    });
    currentRow++;

    // --- Data Rows ---
    data.forEach(item => {
        const row = worksheet.getRow(currentRow);
        columns.forEach((col, index) => {
            const cell = row.getCell(index + 1);
            cell.value = item[col.key];
            cell.style = {...defaultCellStyle, ...globalCellStyle, ...col.style};

            // Specific handling for numbers (e.g., right alignment)
            if (typeof item[col.key] === 'number') {
                cell.alignment = {...cell.style.alignment, horizontal: 'right'};
                // Example number format, can be customized via col.style or globalCellStyle
                // cell.numFmt = '#,##0.00';
            }
        });
        currentRow++;
    });

    // Set column widths
    setColumnWidths(worksheet, columns, title ? 3 : 1);

    // --- Generate and Download File ---
    try {
        await downloadExcelFile(workbook, fileName);
        onSuccess?.();
    } catch (error) {
        console.error("Error exporting to Excel:", error);
        onError?.(error);
    }
};

/**
 * Exports multiple chart datasets to an Excel file.
 * Each chart's data will be in a separate sheet.
 *
 * @param allData An object where keys are sheet names and values are chart data.
 * @param fileName The desired name for the Excel file (without .xlsx extension).
 */
export const exportAllChartDataToFile = async (
    allData: Record<string, any>,
    fileName: string,
    options?: { 
        adjustHeaderWidth?: boolean,
        columnTranslations?: Record<string, string>,
        title?: string,
        reportDate?: string
    }
): Promise<void> => {
    try {
        const workbook = new ExcelJS.Workbook();
        const today = new Date();
        const dateStr = `Ngày xuất: ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

        for (const key in allData) {
            if (Object.prototype.hasOwnProperty.call(allData, key)) {
                const chartData = allData[key];
                const sheetName = getFormattedSheetName(key);
                if (!chartData || (Array.isArray(chartData) && chartData.length === 0)) {
                    console.warn(`No data for ${key}, skipping sheet`);
                    continue;
                }
                const worksheet = workbook.addWorksheet(sheetName);
                const {formattedData, columns} = formatChartDataForExcel(chartData, options?.columnTranslations);

                // Add title and reportDate (tên lô) nếu có
                const startRow = addTitleAndDateToWorksheet(
                    worksheet,
                    options?.title || getChartTitle(key),
                    options?.reportDate || '',
                    columns
                );

                const headerRow = worksheet.getRow(startRow);
                headerRow.height = 30;
                columns.forEach((col, index) => {
                    const cell = headerRow.getCell(index + 1);
                    cell.value = col.header;
                    cell.style = {...defaultHeaderStyle};
                });
                formattedData.forEach(item => {
                    const row = worksheet.getRow(startRow + 1 + formattedData.indexOf(item));
                    columns.forEach((col, index) => {
                        const cell = row.getCell(index + 1);
                        cell.value = item[col.key];
                        cell.style = {...defaultCellStyle, ...col.style};
                    });
                });
                if (options && options.adjustHeaderWidth) {
                    // Truyền key gốc (tên sheet gốc) để tính toán width đúng theo string trong allData
                    adjustHeaderColumnWidths(worksheet, columns, key);
                } else {
                    setColumnWidths(worksheet, columns, 4);
                }
            }
        }
        await downloadExcelFile(workbook, fileName);
    } catch (error) {
        console.error("Error exporting chart data to Excel:", error);
        alert('Có lỗi xảy ra khi xuất dữ liệu biểu đồ. Vui lòng thử lại sau.');
    }
};

/**
 * Format a chart key into a valid Excel sheet name (max 31 chars, no special chars)
 */
function getFormattedSheetName(key: string): string {
    // Map Vietnamese chart names to appropriate sheet names
    const nameMap: Record<string, string> = {
        'chinhLyTaiLieu': 'Chỉnh lý tài liệu',
        'huyTaiLieu': 'Hủy tài liệu',
        'huyHoSo': 'Hủy hồ sơ',
        'dotNopLuuThang': 'Đợt nộp lưu theo tháng',
        'dotChuyenPhongThang': 'Đợt chuyển phông theo tháng',
    };

    const sheetName = nameMap[key] || key;
    // Excel sheet name restrictions: max 31 chars, no: / \ ? * [ ]
    return sheetName.slice(0, 31).replace(/[\/\\?*\[\]]/g, '-');
}

/**
 * Get a chart title based on the chart key
 */
function getChartTitle(key: string): string {
    const titleMap: Record<string, string> = {
        'chinhLyTaiLieu': 'Báo cáo thống kê chỉnh lý tài liệu theo loại hình',
        'huyTaiLieu': 'Báo cáo thống kê hủy tài liệu',
        'huyHoSo': 'Báo cáo thống kê hủy hồ sơ',
        'dotNopLuuThang': 'Biểu đồ thống kê đợt nộp lưu theo tháng',
        'dotChuyenPhongThang': 'Biểu đồ thống kê đợt chuyển phông theo tháng',
    };

    return titleMap[key] || `Dữ liệu biểu đồ: ${key}`;
}

/**
 * Format chart data for Excel export based on the type of chart
 */
function formatChartDataForExcel(chartData: any, columnTranslations?: Record<string, string>): { formattedData: any[], columns: ColumnDefinition[] } {
    let formattedData: any[] = [];
    let columns: ColumnDefinition[] = [];

    if (Array.isArray(chartData) && chartData.length > 0 && typeof chartData[0] === 'object') {
        // Lấy đúng keys thực tế từ object đầu tiên
        const firstItem = chartData[0];
        formattedData = chartData;
        columns = Object.keys(firstItem).map(key => {
            const isNumeric = typeof firstItem[key] === 'number';
            // Use translated header if available, otherwise use the original key
            const headerText = columnTranslations?.[key] || key;
            // Nếu là cột STT, soTrang, dungLuongFile thì width nhỏ lại chỉ theo header
            if (key === 'STT') {
                return {
                    header: headerText,
                    key: key,
                    width: 8,
                    style: { alignment: { horizontal: 'center' } },
                    headerStyle: { alignment: { horizontal: 'center' } },
                };
            }
            if (key === 'soTrang') {
                return {
                    header: headerText,
                    key: key,
                    width: 10,
                    style: { alignment: { horizontal: 'center' } },
                    headerStyle: { alignment: { horizontal: 'center' } },
                };
            }
            if (key === 'dungLuongFile') {
                return {
                    header: headerText,
                    key: key,
                    width: 18, // tăng lên
                    style: { alignment: { horizontal: 'center' } },
                    headerStyle: { alignment: { horizontal: 'center' } },
                };
            }
            if (key === 'trangThaiNhanDang' || key === 'trangThaiKySo') {
                return {
                    header: headerText,
                    key: key,
                    width: 20,
                    style: { alignment: { horizontal: 'center' } },
                    headerStyle: { alignment: { horizontal: 'center' } },
                };
            }
            return {
                header: headerText, // Use translated header
                key: key,
                width: isNumeric ? 15 : 30,
                style: isNumeric ? {
                    alignment: { horizontal: 'right' },
                    numFmt: '#,##0.00'
                } : {
                    alignment: { wrapText: true }
                },
                headerStyle: { alignment: { horizontal: 'center' } },
            };
        });
        return { formattedData, columns };
    }

    // Handle different chart data formats
    if (Array.isArray(chartData)) {
        // For PieChartData format (most common)
        if (chartData.length > 0 && (chartData[0].label !== undefined || chartData[0].name !== undefined)) {
            formattedData = chartData.map((item, index) => ({
                index: index + 1,
                label: item.label || item.name || 'N/A',
                value: item.value || 0,
                percentage: item.percentage || item.percent || Math.round((item.value / chartData.reduce((sum, i) => sum + (i.value || 0), 0)) * 10000) / 100
            }));

            columns = [
                {
                    header: 'STT',
                    key: 'index',
                    width: 8,
                    style: {
                        alignment: {horizontal: 'center'}
                    }
                },
                {
                    header: 'Tên',
                    key: 'label',
                    width: 40,
                    style: {
                        alignment: {wrapText: true}
                    }
                },
                {
                    header: 'Giá trị',
                    key: 'value',
                    width: 15,
                    style: {
                        alignment: {horizontal: 'right'},
                        numFmt: '#,##0'
                    }
                },
                {
                    header: 'Phần trăm (%)',
                    key: 'percentage',
                    width: 18,
                    style: {
                        alignment: {horizontal: 'right'},
                        numFmt: '#,##0.00'
                    }
                }
            ];
        }
        // For monthly chart data format
        else if (chartData.length > 0 && chartData[0].month !== undefined) {
            formattedData = chartData.map(item => ({
                month: item.month,
                value: item.value || 0
            }));

            columns = [
                {
                    header: 'Tháng',
                    key: 'month',
                    width: 15,
                    style: {
                        alignment: {horizontal: 'center'}
                    }
                },
                {
                    header: 'Giá trị',
                    key: 'value',
                    width: 20,
                    style: {
                        alignment: {horizontal: 'right'},
                        numFmt: '#,##0'
                    }
                }
            ];
        }
        // Generic format for any array of objects
        else if (chartData.length > 0 && typeof chartData[0] === 'object') {
            formattedData = chartData;

            // Create columns based on the first object's properties
            const firstItem = chartData[0];
            columns = Object.keys(firstItem).map(key => {
                // Determine if the content is numeric for styling
                const isNumeric = typeof firstItem[key] === 'number';

                return {
                    header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
                    key: key,
                    width: isNumeric ? 15 : 30,
                    style: isNumeric ? {
                        alignment: {horizontal: 'right'},
                        numFmt: '#,##0.00'
                    } : {
                        alignment: {wrapText: true}
                    }
                };
            });
        }
    }

    // If we still couldn't format the data, provide a simple format
    if (formattedData.length === 0) {
        formattedData = [{data: JSON.stringify(chartData)}];
        columns = [{
            header: columnTranslations?.['data'] || 'Dữ liệu',
            key: 'data',
            width: 100,
            style: {
                alignment: {wrapText: true}
            }
        }];
    }

    return {formattedData, columns};
}






export function serializeChartConfig(config?: ChartConfig): string {
  return JSON.stringify(config, (key, value) => {
    if (value && typeof value === "object" && "toString" in value && value.toString().includes("Color")) {
      return value.toString();
    }
    return value;
  });
}

export function deserializeChartConfig(jsonString: string): ChartConfig {
  return JSON.parse(jsonString, (key, value) => {
    if ((key === "fill" || key === "stroke") && typeof value === "string") {
      return am5.color(value);
    }
    return value;
  });
}
